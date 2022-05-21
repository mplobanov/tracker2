import { Datepicker } from "../../../../components/ui/Datepicker/Datepicker";
import { DetailsRow } from "../../../../components/ui/DetailsRow/DetailsRow";

export type DateFormProps = {
	name: string;
	loading?: boolean;
	header?: string;
};

export const DateForm = ({ name, loading, header }: DateFormProps) => {
	return (
		<DetailsRow header={header ?? ""}>
			<Datepicker name={name} loading={loading} />
		</DetailsRow>
	);
};
