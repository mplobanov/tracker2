import { Formik } from "formik";
import { AvatarChoice } from "../../../components/ui/AvatarChoice/AvatarChoice";
import { useUserList } from "../../../utils/user";
import { AvatarLogic } from "../../logic/AvatarLogic/AvatarLogic";
import styles from "./Filters.module.css";
import { Dropdown } from "../../../components/ui/Dropdown/Dropdown";
import { Button } from "../../../components/ui/Button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../../utils/auth";
import { useStatusList } from "../../../utils/statuses";

export type FiltersProps = {
	onSubmit: (filter: TaskFilter) => void;
};

export type TaskFilter = {
	authors: string[];
	assignees: string[];
	followers: string[];
	status: string;
};

export const EMPTY_FILTER: TaskFilter = {
	authors: [],
	assignees: [],
	followers: [],
	status: "Не назначен",
};

export const Filters = ({ onSubmit }: FiltersProps) => {
	const { users } = useUserList();
	const { statusList } = useStatusList();

	const [initialFilter, setInitialFilter] =
		useState<TaskFilter>(EMPTY_FILTER);

	const params = useParams();
	const { user } = useUser();

	useEffect(() => {
		if (user && params.meType) {
			if (params.meType === "author") {
				setInitialFilter({
					...EMPTY_FILTER,
					authors: [user.uid],
				});
			} else if (params.meType === "assignee") {
				setInitialFilter({
					...EMPTY_FILTER,
					assignees: [user.uid],
				});
			} else if (params.meType === "follower") {
				setInitialFilter({
					...EMPTY_FILTER,
					followers: [user.uid],
				});
			}
		}
	}, [params.meType, user]);

	return (
		<Formik
			initialValues={initialFilter}
			onSubmit={(values) => onSubmit(values)}
			enableReinitialize
		>
			{(props) => (
				<div className={styles.container}>
					<div className={styles.section}>
						<span>Авторы</span>
						<AvatarChoice
							name={"authors"}
							choices={users}
							left={true}
						/>
						{props.values.authors.map((uid, i) => (
							<AvatarLogic uid={uid} key={i} small />
						))}
					</div>

					<div className={styles.section}>
						<span>Исполнители</span>
						<AvatarChoice
							name={"assignees"}
							choices={users}
							left={true}
						/>
						{props.values.assignees.map((uid, i) => (
							<AvatarLogic uid={uid} key={i} small />
						))}
					</div>

					<div className={styles.section}>
						<span>Наблюдатели</span>
						<AvatarChoice
							name={"followers"}
							choices={users}
							left={true}
						/>
						{props.values.followers.map((uid, i) => (
							<AvatarLogic uid={uid} key={i} small />
						))}
					</div>

					<div className={styles.section}>
						<span>Статус</span>
						<Dropdown name={"status"} choices={statusList ?? []} />
					</div>

					<div className={styles.section}>
						<Button
							text={"Найти"}
							onClick={() => props.submitForm()}
						/>
					</div>
				</div>
			)}
		</Formik>
	);
};
