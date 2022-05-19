import {useEffect, useState} from "react";
import {DefaultService, User} from "../services/openapi";

export const useUidUser = (uid: string) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!!uid) {
            DefaultService.getUserUserUidGet(uid).then(res => {
                setUser(res);
            })
        }

    }, [uid]);

    return {
        user,
        loading: user === null
    };
}