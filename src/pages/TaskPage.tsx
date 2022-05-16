import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {DefaultService, Task} from "../services/openapi";
import {useFormik} from "formik";
import {DEFAULT_TASK} from "./CreateTask";

export const TaskPage = () => {
    const params = useParams();
    const [task, setTask] = useState<Task>(DEFAULT_TASK);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async (slug: string) => {
            return DefaultService.getTaskTaskSlugGet(slug);
        }

        fetch(params.taskSlug as string).then(tasks => {
            setTask(tasks.at(0) ?? DEFAULT_TASK);
        }).catch(err => console.log(err))
    }, [params.taskSlug]);

    const formik = useFormik({
        initialValues: task,
        onSubmit: async (values) => {
            await DefaultService.updateTaskTaskSlugUpdatePost(params.taskSlug as string, values).catch(err => console.log(err));
            navigate(`/task/${values.slug}`);
        },
        enableReinitialize: true
    });

    return (
        <div>
            Task {params.taskSlug}
            {JSON.stringify(task)}
            <form onSubmit={formik.handleSubmit}>
                <input  {...formik.getFieldProps('name')} placeholder={'name'}/>
                <input  {...formik.getFieldProps('slug')} placeholder={'slug'}/>
                <input  {...formik.getFieldProps('description')} placeholder={'desc'} />
                <button type={'submit'}>Create</button>
            </form>
        </div>
    )
}