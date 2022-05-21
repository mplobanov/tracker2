import { AvatarLogic } from "../../../logic/AvatarLogic/AvatarLogic";
import { DetailsRow } from "../../../../components/ui/DetailsRow/DetailsRow";
import { useField } from "formik";
import { useUserList } from "../../../../utils/user";
import { AvatarChoiceSingle } from "../../../../components/ui/AvatarChoice/AvatarChoiceSingle";

export type SinglePersonFormProps = {
	name: string;
	loading?: boolean;
	header?: string;
};

export const SinglePersonForm = ({
	name,
	loading,
	header,
}: SinglePersonFormProps) => {
	const [field, ,] = useField<string>(name);
	const { loading: userLoading, users } = useUserList();

	return (
		<DetailsRow header={header ?? ""} loading={loading}>
			<AvatarChoiceSingle
				name={name}
				choices={users}
				loading={loading || userLoading}
			/>
			<AvatarLogic uid={field.value} />
		</DetailsRow>
	);
};
