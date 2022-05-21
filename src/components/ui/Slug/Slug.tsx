import styles from "./Slug.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { useField } from "formik";

type SlugParams = {
	name: string;
	constructCopyText?: (value: string) => string;
	copy?: boolean;
	loading?: boolean;
};

export const Slug = ({
	name,
	copy = true,
	constructCopyText,
	loading,
}: SlugParams) => {
	const [field, ,] = useField<string>(name);

	const [clicked, setClicked] = useState(false);
	const [edit, setEdit] = useState(false);

	const handleClick = async () => {
		await navigator.clipboard.writeText(
			constructCopyText ? constructCopyText(field.value) : field.value
		);
		setClicked((val) => !val);
	};

	const handleEditClick = () => {
		setEdit((v) => {
			return !v;
		});
	};

	if (loading) {
		return <Skeleton height={"2.2rem"} width={"10rem"} />;
	}

	return (
		<span className={styles.container}>
			<span
				className={`${styles.slug} ${edit && styles.slugEdit}`}
				onClick={handleClick}
			>
				{edit ? (
					<input
						{...field}
						disabled={!edit}
						className={styles.input}
						width={"25ch"}
					/>
				) : (
					field.value
				)}

				{!edit && copy && (
					<span
						className={`material-symbols-outlined ${styles.copyIcon}`}
					>
						{clicked ? "check" : "content_copy"}
					</span>
				)}
			</span>
			<span
				className={`material-symbols-outlined ${styles.editIcon}`}
				onClick={handleEditClick}
			>
				edit
			</span>
		</span>
	);
};
