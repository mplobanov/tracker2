import styles from "../../TaskPage.module.css";
import { DetailsRow } from "../../../../components/ui/DetailsRow/DetailsRow";
import { Dropdown } from "../../../../components/ui/Dropdown/Dropdown";
import { Button } from "../../../../components/ui/Button/Button";
import { FormState } from "../TaskForm";
import { useMemo } from "react";
import { SinglePersonForm } from "./SinglePersonForm";
import { MultiplePersonForm } from "./MultiplePersonForm";
import { concatNames } from "../../../../utils/forms";
import { DateForm } from "./DateForm";
import { useStatusList } from "../../../../utils/statuses";

export type SideFormProps = {
	name: string;
	loading: boolean;
	submit: () => {};
	formState: FormState;
};

export const SideForm = ({
	name,
	loading,
	submit,
	formState,
}: SideFormProps) => {
	const { statusList } = useStatusList();

	const buttonText = useMemo(() => {
		if (
			formState === FormState.NotEdited ||
			formState === FormState.Edited
		) {
			return "Сохранить";
		} else if (formState === FormState.Saving) {
			return "Сохраняем...";
		} else if (formState === FormState.Saved) {
			return "Сохранено!";
		}
	}, [formState]);

	return (
		<div className={styles.side}>
			<SinglePersonForm
				name={concatNames([name, "author_id"])}
				loading={loading}
				header={"Автор"}
			/>
			<SinglePersonForm
				name={concatNames([name, "assignee_id"])}
				loading={loading}
				header={"Исполнитель"}
			/>
			<MultiplePersonForm
				name={concatNames([name, "follower_ids"])}
				loading={loading}
				header={"Наблюдатели"}
			/>
			<DetailsRow header={"Статус"}>
				<Dropdown
					name={concatNames([name, "status"])}
					choices={statusList ?? []}
					loading={loading}
				/>
			</DetailsRow>
			<DateForm
				name={concatNames([name, "deadline"])}
				loading={loading}
				header={"Дедлайн"}
			/>
			<Button text={buttonText} onClick={() => submit()} />
		</div>
	);
};
