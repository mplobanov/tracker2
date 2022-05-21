import styles from "../../TaskPage.module.css";
import { Slug } from "../../../../components/ui/Slug/Slug";

export type SlugFormProps = {
	name: string;
};

export const SlugForm = ({ name }: SlugFormProps) => {
	return (
		<div className={styles.slug}>
			<span>Задача</span>
			<Slug
				name={name}
				constructCopyText={(value) =>
					`${window.location.origin}/task/${value}`
				}
			/>
		</div>
	);
};
