import {useMemo} from "react";
import {useParams} from "react-router-dom";
import {useUser} from "../../utils/auth";
import {Page} from "../../components/ui/Page/Page";
import {Header} from "../logic/Header/Header";
import {useUidUser} from "../../utils/user";
import styles from './UserPage.module.css';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import {Button} from "../../components/ui/Button/Button";


export const UserPage = () => {
    console.log('set');
    const params = useParams();

    const {
        loading, user
    } = useUidUser(params.userId as string);

    const {loading: myLoading, user: myUser, logout} = useUser();


    const myPage = useMemo(() => myUser?.uid === params.userId, [myUser?.uid, params.userId]);


    return (
        <Page>
            <Header/>
            <div className={styles.container}>
                <div>
                    {loading && <Skeleton width={"200px"} height={"200px"} circle/>}
                    {!loading && <img alt={params.userId} src={user?.photoUrl} className={styles.img}/>}
                </div>
                <div className={styles.info}>
                    {loading && <>
                        <Skeleton height={"45px"}/>
                        <Skeleton height={"25px"} count={5}/>
                    </>}
                    <h1>{user?.name}</h1>
                    {myPage && <>
                        <Button text={"Выйти"} onClick={() => logout()}/>
                    </>}
                </div>

            </div>

        </Page>

    )
}