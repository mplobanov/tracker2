import {Avatar} from "../components/ui/Avatar/Avatar";
import {useEffect, useState} from "react";
import {DefaultService, User} from '../services/openapi'
import {useParams} from "react-router-dom";


export const UserPage = () => {
    const [user, setUser] = useState<User>();
    const params = useParams();

    useEffect(() => {
        const fetch = async (uid: string) => {
            return DefaultService.getUserUserUidGet(uid);
        }

        fetch(params.userId as string).then(
            user => {
                setUser(user);
            }
        ).catch(err => console.log(err));
    }, [params]);

    return (
        <Avatar imageUrl={user?.photoUrl ?? ''} name={user?.name.split(' ').at(0) ?? ''}/>
    )
}