import { DefaultService, Task } from "../services/openapi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "./auth";
import { useMultipleUidUser } from "./user";

export const useTaskList = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const uids = useMemo(() => tasks.map((t) => t.assignee_id), [tasks]);
	const users = useMultipleUidUser(uids);

	useEffect(() => {
		const f = async () => {
			setTasks(await DefaultService.allTasksListGet());
			setLoading(false);
		};
		f();
	}, []);

	return {
		usersData: {
			users,
		},
		tasksData: {
			loading,
			tasks,
		},
	};
};

export const useTask = (slug: string) => {
	const [tasks, setTasks] = useState<Task[] | null>(null);
	const { user } = useUser();

	useEffect(() => {
		setTasks((ts) => {
			ts?.map((t) => {
				if (t.comments.at(t.comments.length - 1)?.text !== "") {
					t.comments.push({
						author_id: user?.uid ?? "",
						text: "",
						created_at: new Date().toISOString(),
					});
				}

				return t;
			});
			return ts;
		});
	}, [user, tasks]);

	useEffect(() => {
		DefaultService.getTaskTaskSlugGet(slug).then((res) => {
			setTasks(res);
		});
	}, [slug]);

	const submit = (newTask: Task) => {
		return DefaultService.updateTaskTaskSlugUpdatePost(slug, newTask);
	};

	return {
		loading: tasks === null,
		tasks,
		submit,
	};
};

export const useCreateTask = () => {
	const { user } = useUser();

	const create = useCallback(() => {
		return DefaultService.createTaskTaskCreatePost({
			name: "",
			description: "",
			author_id: user?.uid ?? "",
			assignee_id: user?.uid ?? "",
			comments: [],
			status: "Открыто",
			slug: new Date().toISOString(),
			deadline: new Date().toISOString(),
			follower_ids: [],
		});
	}, [user?.uid]);

	return {
		available: !!user,
		create,
	};
};
