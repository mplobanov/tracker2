import {Form, FormikProps, useFormik} from "formik";
import {Comment, DefaultService, Task} from "../services/openapi";

export const DEFAULT_TASK: Task = {
    name: "",
    description: "",
    author_id: "",
    comments: [],
    assignee_id: "",
    follower_ids: [],
    slug: "",
    deadline: "",
    status: ""
}

export const CreateTask = () => {
    const formik = useFormik<Task>({
        initialValues: DEFAULT_TASK,
        onSubmit: values => {
            DefaultService.createTaskTaskCreatePost(values);
            console.log('')
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input  {...formik.getFieldProps('name')} placeholder={'name'}/>
                <input  {...formik.getFieldProps('slug')} placeholder={'slug'}/>
                <input  {...formik.getFieldProps('description')} placeholder={'desc'} />
                <button type={'submit'}>Create</button>
            </form>
        </div>
    )
};