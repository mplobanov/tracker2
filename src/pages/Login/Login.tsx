import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CenterPage} from "../../components/ui/CenterPage/CenterPage";
import styles from './Login.module.css';
import {Logo} from "../../components/ui/Logo/Logo";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../../components/ui/Button/Button";


export const Login = () => {
    const auth = useMemo(() => getAuth(), []);

    const navigate = useNavigate();
    const loaction = useLocation();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user?.getIdToken().then(res => localStorage.setItem("auth_token", res));
            setChecked(true);
        })
    }, [auth]);


    const handleLogin = useCallback(() => {
        const provider = new GoogleAuthProvider();
        auth.languageCode = 'ru';

        signInWithPopup(auth, provider)
            .then((result) => {
                result.user.getIdToken().then(res => localStorage.setItem("auth_token", res));
                if (loaction.pathname.includes('login')) {
                    navigate("/list");
                }

            }).catch((error) => {
            console.log('error', error);
        });
    }, [auth, loaction.pathname, navigate]);


    if (!checked) {
        return <CenterPage>
            <Logo onClick={() => {}}/>
            </CenterPage>
    }

    return <CenterPage>
        <div className={styles.container}>
            <div className={styles.logo}><Logo onClick={() => navigate("/")} /></div>
            <div className={styles.buttons}>
                <Button text={"Войти с помощью Google"} onClick={handleLogin} secondary={true} />
                <Button text={"Войти с помощью Apple"} onClick={() => {}} secondary={true} disabled/>
            </div>

        </div>
    </CenterPage>
        ;
}