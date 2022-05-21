import styles from "../../TaskPage.module.css";
import { SlugForm } from "./SlugForm";
import { Title } from "../../../../components/ui/Title/Title";
import { CommentsForm } from "./CommentsForm";
import { concatNames } from "../../../../utils/forms";

export type BodyFormProps = {
	name: string;
	loading: boolean;
};

export const BodyForm = ({ name, loading }: BodyFormProps) => {
	return (
		<div className={styles.body}>
			<div>
				<SlugForm name={concatNames([name, "slug"])} />
				<Title
					name={concatNames([name, "name"])}
					loading={loading}
					placeholder={"Название задачи"}
				/>
			</div>
			<Title
				name={concatNames([name, "description"])}
				small={true}
				loading={loading}
				placeholder={"Описание задачи"}
			/>
			<CommentsForm name={concatNames([name, "comments"])} />
		</div>
	);
};
