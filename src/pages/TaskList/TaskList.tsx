import { Page } from "../../components/ui/Page/Page";
import { Header } from "../logic/Header/Header";
import styles from "./TaskList.module.css";
import { useTaskList } from "../../utils/tasks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Avatar } from "../../components/ui/Avatar/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import { getSimpleName } from "../../utils/forms";
import { EMPTY_FILTER, Filters, TaskFilter } from "./Filters/Filters";
import { useEffect, useState } from "react";
import { filterTasks } from "./Filters/filter";
import { useUser } from "../../utils/auth";

export const TaskList = () => {
	const { usersData, tasksData } = useTaskList();
	const { tasks, loading } = tasksData;
	const { users } = usersData;
	const [ftr, setFtr] = useState<TaskFilter>(EMPTY_FILTER);

	const params = useParams();
	const { user } = useUser();

	useEffect(() => {
		if (user && params.meType) {
			if (params.meType === "author") {
				setFtr({
					...EMPTY_FILTER,
					authors: [user.uid],
				});
			} else if (params.meType === "assignee") {
				setFtr({
					...EMPTY_FILTER,
					assignees: [user.uid],
				});
			} else if (params.meType === "follower") {
				setFtr({
					...EMPTY_FILTER,
					followers: [user.uid],
				});
			}
		}
	}, [params.meType, user]);

	const filteredTasks = filterTasks(ftr, tasks);

	const navigate = useNavigate();

	const submit = (nfilter: TaskFilter) => {
		setFtr((v) => {
			return { ...nfilter };
		});
	};

	return (
		<Page>
			<Header />
			<h1>Задачи</h1>
			<Filters onSubmit={submit} />
			<table className={styles.list}>
				<tbody>
					<tr>
						<td className={styles.bigColumn}>
							<span className={styles.columnName}>Задача</span>
						</td>
						<td className={styles.smallColumn}>
							<span className={styles.columnName}>Статус</span>
						</td>
						<td className={styles.smallColumn}>
							<span className={styles.columnName}>
								Исполнитель
							</span>
						</td>
					</tr>
					{loading &&
						[...Array(15)].map((x, i) => (
							<tr key={i}>
								<td>
									<Skeleton height={"25px"} />
								</td>
								<td>
									<Skeleton height={"20px"} />
								</td>
								<td>
									<Avatar loading={true} name={"x"} />
								</td>
							</tr>
						))}

					{filteredTasks.map((task, i) => (
						<tr
							className={styles.row}
							onClick={() => navigate(`/task/${task.slug}`)}
							key={i}
						>
							<td>
								<h2>{task.name}</h2>
							</td>
							<td>
								<span>{task.status}</span>
							</td>
							<td>
								<Avatar
									loading={users.at(i) === undefined}
									imageUrl={
										users.find(
											(u) => u.uid === task.assignee_id
										)?.user.photoUrl ?? ""
									}
									name={getSimpleName(
										users.find(
											(u) => u.uid === task.assignee_id
										)?.user.name
									)}
									onClick={(e) => {
										e.stopPropagation();
										navigate(`/user/${task.assignee_id}`);
									}}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Page>
	);
};
