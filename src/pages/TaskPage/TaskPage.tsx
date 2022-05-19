import {useNavigate, useParams} from "react-router-dom";
import {Formik} from "formik";
import {DEFAULT_TASK} from "../CreateTask";
import {useTask} from "../../utils/tasks";
import {Page} from "../../components/ui/Page/Page";
import {Header} from "../logic/Header/Header";
import styles from './TaskPage.module.css';
import {Title} from "../../components/ui/Title/Title";
import {Comment} from "../../components/ui/Comment/Comment";
import {DefaultService} from "../../services/openapi";
import {useUser} from "../../utils/auth";
import {Slug} from "../../components/ui/Slug/Slug";
import {DetailsRow} from "../../components/ui/DetailsRow/DetailsRow";
import {AvatarLogic} from "../logic/AvatarLogic/AvatarLogic";
import {Dropdown} from "../../components/ui/Dropdown/Dropdown";
import {Datepicker} from "../../components/ui/Datepicker/Datepicker";
import {Button} from "../../components/ui/Button/Button";
import {useState} from "react";

export const TaskPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {loading, tasks, submit} = useTask(params.taskSlug as string);
    const {user} = useUser()
    const [buttonText, setButtonText] = useState('Сохранить');
    // const [showButton, setShowButton] = useState(false);

    const getPlaceholder = (i: number, n: number, name: string) => {
        if (i + 1 === n) {
            return `${name}, напишите ${n > 1 ? 'и вы' : '' } что-нибудь`
        } else {
            return "Удалим этот комментарий"
        }
    }

    return (
        <Page>
            <Header />
            <Formik initialValues={tasks?.at(0) ?? DEFAULT_TASK} onSubmit={ async (values) => {
                setButtonText('Сохраняем...');
                values.comments = values.comments.filter(comment => comment.text !== '');
                submit(values).then(() => {
                    setButtonText('Сохранено!');
                })
            }} enableReinitialize>
                {props => <div className={styles.container}>
                    <div className={styles.body}>
                        <div>
                            <div className={styles.slug}>
                                <span>Задача</span>
                                <Slug text={props.values.slug} textToCopy={`${window.location.origin}/task/${props.values.slug}`}/>
                            </div>
                        <Title name={"name"} loading={loading} placeholder={"Название задачи"}/></div>
                        <Title name={"description"} small={true} loading={loading} placeholder={"Описание задачи"} />
                        <div className={styles.comments}>
                            {[...Array(props.values.comments.length ?? 0)].map((x, i) => {
                                return <Comment
                                    key={i}
                                    name={`comments[${i}]`}
                                    getUserByAuthorId={(uid: string) => DefaultService.getUserUserUidGet(uid)}
                                    getCurrentUserId={() => user?.uid ?? ''}
                                    placeholder={getPlaceholder(i, props.values.comments.length, user?.displayName?.split(' ').at(0) ?? '')}
                                    hideFooter={props.values.comments.length === i + 1}
                                    onAvatarClick={() => navigate(`/user/${props.values.comments.at(i)?.author_id}`)}
                                />
                            })}
                        </div>
                    </div>
                    <div className={styles.side}>
                        <DetailsRow header={"Автор"} loading={loading}>
                            <AvatarLogic uid={props.values.author_id} />
                        </DetailsRow>
                        <DetailsRow header={"Исполнитель"} loading={loading}>
                            <AvatarLogic uid={props.values.assignee_id} />
                        </DetailsRow>
                        <DetailsRow header={"Наблюдатели"}>
                            {props.values.follower_ids.map((uid, i) => <AvatarLogic key={i} uid={uid} />)}
                        </DetailsRow>
                        <DetailsRow header={"Статус"}>
                            <Dropdown name={"status"} choices={['В разработке', 'Открыто', 'Завершено']} loading={loading}/>
                        </DetailsRow>
                        <DetailsRow header={"Дедлайн"}>
                            <Datepicker name={"deadline"} loading={loading}/>
                        </DetailsRow>
                        <Button text={buttonText} onClick={() => props.submitForm()}/>
                    </div>
                </div>}
            </Formik>

        </Page>
    )
}