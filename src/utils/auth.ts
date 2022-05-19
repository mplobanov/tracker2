import {getAuth, User, signOut} from "firebase/auth";
import {useCallback, useEffect, useState} from "react";
// import firebase from "firebase/auth";

export const useUser = () => {
    const auth = getAuth();

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        auth.onAuthStateChanged((user: User | null) => {
            setUser(user);
        })
    }, [auth]);


    const logout = useCallback(() => {
        localStorage.removeItem('auth_token');
        signOut(auth);
    }, [auth]);

    return {
        user,
        loading: user === null,
        logout
    };
}