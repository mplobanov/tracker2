import {DefaultService, Task, User} from "../services/openapi";
import {useCallback, useEffect, useState} from "react";
import {useUser} from "./auth";

export const useTaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<Map<string, User>>(new Map());

    useEffect(() => {
        const f = async () => {
            setTasks(await DefaultService.allTasksListGet());
            setLoading(false);
        };
        f();
    }, []);

    useEffect(() => {
        Promise.all<{
            user: User, slug: string
        }>(tasks.map(async (task, i) => {
            return {user: await DefaultService.getUserUserUidGet(task.assignee_id), slug: task.slug}
        })).then(res => {
            setUsers(() => {
                const map: Map<string, User> = new Map();
                res.forEach(elem => {
                    map.set(elem.slug, elem.user);
                })
                return map;
            })
        })
    }, [tasks]);

    return {
        usersData: {
            users
        },
        tasksData: {
            loading, tasks
        }
    }

};

export const useTask = (slug: string) => {
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const {user} = useUser();

    useEffect(() => {
        setTasks(ts => {
            ts?.map(t => {
                console.log('ooo');
                if (t.comments.at(t.comments.length - 1)?.text !== '') {
                    console.log('aye', user?.displayName, user?.uid);
                    t.comments.push({
                        author_id: user?.uid ?? '',
                        text: "",
                        created_at: new Date().toISOString(),
                    });
                }

                return t;
            })
            return ts;
        })
    }, [user, tasks])


    useEffect(() => {
        DefaultService.getTaskTaskSlugGet(slug).then(res => {
            setTasks(res);
        })
    }, [slug]);

    const submit = (newTask: Task) => {
        return DefaultService.updateTaskTaskSlugUpdatePost(slug, newTask);
    }

    return {
        loading: tasks === null,
        tasks,
        submit
    }
}

export const useCreateTask = () => {
    const {user} = useUser();

    const create = useCallback(() => {
        return DefaultService.createTaskTaskCreatePost({
            name: "",
            description: "",
            author_id: user?.uid ?? '',
            assignee_id: user?.uid ?? '',
            comments: [],
            status: "Открыто",
            slug: new Date().toISOString(),
            deadline: new Date().toISOString(),
            follower_ids: []
        });
    }, [user?.uid]);

    return {
        available: !!user,
        create
    };
}