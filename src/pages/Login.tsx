import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useCallback, useState} from "react";


export const Login = () => {
    const auth = getAuth();

    const [photo, setPhoto] = useState(auth.currentUser?.photoURL);

    const handleLogin = useCallback(() => {
        const provider = new GoogleAuthProvider();
        auth.languageCode = 'ru';

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(token, user);
                console.log(user.photoURL);
                setPhoto(user.photoURL ?? '');
                user.getIdToken().then(res => console.log(res));
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }, [auth]);


    return <div onClick={handleLogin}>Login {photo && <img src={photo} alt={'avatar'}/>}</div>;
}