import { useParams } from "react-router-dom";
import { Page } from "../../components/ui/Page/Page";
import { Header } from "../logic/Header/Header";
import { TaskForm } from "./TaskForm/TaskForm";

export const TaskPage = () => {
	const params = useParams();

	return (
		<Page>
			<Header />
			<TaskForm slug={params.taskSlug as string} />
		</Page>
	);
};
