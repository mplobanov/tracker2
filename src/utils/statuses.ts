import { useEffect, useState } from "react";
import { DefaultService } from "../services/openapi";

export const useStatusList = () => {
	const [statusList, setStatusList] = useState<string[] | null>(null);

	useEffect(() => {
		DefaultService.getStatusListStatusListGet().then((res) => {
			setStatusList(res.map((s) => s.name));
		});
	}, []);

	return {
		loading: setStatusList === null,
		statusList,
	};
};
