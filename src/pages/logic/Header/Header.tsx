import styles from './Header.module.css';
import {Logo} from "../../../components/ui/Logo/Logo";
import {useNavigate} from "react-router-dom";
import {Avatar} from "../../../components/ui/Avatar/Avatar";
import {useUser} from "../../../utils/auth";
import {Button} from "../../../components/ui/Button/Button";
import {useCreateTask} from "../../../utils/tasks";

export const Header = () => {
    const navigate = useNavigate();

    const {
        user, loading
    } = useUser();

    const {create, available} = useCreateTask();

    return (
        <div className={styles.container}>
            <Logo onClick={() => navigate("/")}/>
            <div className={styles.menu}>
                <div className={` ${styles.menuOptionSecondary}`}>
                    Задачи, где
                </div>
                <div className={styles.menuOption} onClick={() => navigate('/list')}>
                    Я исполнитель
                </div>
                <div className={styles.menuOption} onClick={() => navigate('/list')}>
                    Я наблюдатель
                </div>
                <div className={styles.menuOption} onClick={() => navigate('/list')}>
                    Я автор
                </div>
            </div>
            <div className={styles.create}>
                <Button text={"Создать"} onClick={() => {
                    create().then((res) => {
                        navigate(`/task/${res.slug}`);
                    })
                }} disabled={!available} secondary={true} />
            </div>
            <Avatar loading={loading}
                    imageUrl={user?.photoURL ?? ''}
                    name={user?.displayName?.split(' ')[0]}
                    big={true}
                    reverse={true}
                    onClick={() => navigate(`/user/${user?.uid}`)}/>
        </div>
    );
}