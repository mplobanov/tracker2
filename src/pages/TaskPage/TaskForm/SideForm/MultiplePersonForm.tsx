import { useField } from "formik";
import { AvatarLogic } from "../../../logic/AvatarLogic/AvatarLogic";
import { DetailsRow } from "../../../../components/ui/DetailsRow/DetailsRow";
import { AvatarChoice } from "../../../../components/ui/AvatarChoice/AvatarChoice";
import { useUserList } from "../../../../utils/user";

export type MultiplePersonFormProps = {
	name: string;
	loading?: boolean;
	header?: string;
};

export const MultiplePersonForm = ({
	name,
	loading,
	header,
}: MultiplePersonFormProps) => {
	const [field, ,] = useField<string[]>(name);
	const { loading: userLoading, users } = useUserList();

	return (
		<DetailsRow header={header ?? ""}>
			<AvatarChoice
				name={name}
				choices={users}
				loading={loading || userLoading}
			/>
			{field.value.map((uid, i) => (
				<AvatarLogic key={i} uid={uid} />
			))}
			{field.value.length === 0 && "нет"}
		</DetailsRow>
	);
};
