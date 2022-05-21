import { DEFAULT_TASK } from "../../CreateTask";
import styles from "../TaskPage.module.css";
import { Formik } from "formik";
import { useTask } from "../../../utils/tasks";
import { useState } from "react";
import { SideForm } from "./SideForm/SideForm";
import { BodyForm } from "./BodyForm/BodyForm";
import { useNavigate } from "react-router-dom";

export type TaskFormParams = {
	slug: string;
};

export enum FormState {
	NotEdited,
	Edited,
	Saving,
	Saved,
}

export const TaskForm = ({ slug }: TaskFormParams) => {
	const navigate = useNavigate();
	const { loading, tasks, submit } = useTask(slug);

	const [formState, setFormState] = useState(FormState.NotEdited);

	return (
		<Formik
			initialValues={tasks?.at(0) ?? DEFAULT_TASK}
			onSubmit={async (values) => {
				setFormState(FormState.Saving);
				values.comments = values.comments.filter(
					(comment) => comment.text !== ""
				);
				submit(values).then(() => {
					setFormState(FormState.Saved);
					navigate(`/task/${values.slug}`);
				});
			}}
			enableReinitialize
		>
			{(props) => (
				<div className={styles.container}>
					<BodyForm name={""} loading={loading} />
					<SideForm
						name={""}
						submit={() => props.submitForm()}
						formState={formState}
						loading={loading}
					/>
				</div>
			)}
		</Formik>
	);
};
