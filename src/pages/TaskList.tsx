import {useEffect, useState} from "react";
import {DefaultService, Task} from "../services/openapi";

export const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetch = async () => {
            return DefaultService.allTasksListGet();
        }

        fetch().then(res => {
            setTasks(res);
        }).catch(err => {
            console.log(err);
        })


    }, []);

    return (
        <ul>
            {tasks.map(task => <li>{JSON.stringify(task)}</li>)}
        </ul>
    );
}