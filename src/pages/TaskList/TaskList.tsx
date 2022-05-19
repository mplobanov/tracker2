import {Page} from "../../components/ui/Page/Page";
import {Header} from "../logic/Header/Header";
import styles from './TaskList.module.css';
import {useTaskList} from "../../utils/tasks";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import {Avatar} from "../../components/ui/Avatar/Avatar";
import {useNavigate} from "react-router-dom";

export const TaskList = () => {
    const {usersData, tasksData} = useTaskList();
    const {tasks, loading} = tasksData;
    const {users} = usersData;

    const navigate = useNavigate();

    return (
        <Page>
            <Header/>
            <h1>Задачи</h1>
            <table className={styles.list}>
                <tbody>
                <tr>
                    <td className={styles.bigColumn}><span className={styles.columnName}>Задача</span></td>
                    <td className={styles.smallColumn}><span  className={styles.columnName}>Статус</span></td>
                    <td className={styles.smallColumn}><span  className={styles.columnName}>Исполнитель</span></td>
                </tr>
                {loading && [...Array(15)].map((x, i) => <tr key={i}>
                    <td><Skeleton height={"25px"}/></td>
                    <td><Skeleton height={"20px"}/></td>
                    <td><Avatar loading={true} name={"x"}/></td>
                </tr>)
                }

                {tasks.map((task, i) =>
                    <tr className={styles.row} onClick={() => navigate(`/task/${task.slug}`)} key={i}>
                        <td><h2>{task.name}</h2></td>
                        <td><span>{task.status}</span></td>
                        <td>
                            <Avatar
                                loading={!users.has(task.slug)}
                                imageUrl={users.get(task.slug)?.photoUrl ?? ''}
                                name={users.get(task.slug)?.name.split(' ').at(0) ?? 'x'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/user/${task.assignee_id}`)
                                }}
                            />
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </Page>

    );
}