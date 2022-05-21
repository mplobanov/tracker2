import { EMPTY_FILTER, TaskFilter } from "./Filters";
import { Task } from "../../../services/openapi";

export const filterTasks = (filter: TaskFilter, tasks: Task[]) => {
	return (
		tasks
			// .map((v) => {
			// 	console.log("0", v);
			// 	return v;
			// })
			.filter(
				(task) =>
					filter.authors.length === 0 ||
					filter.authors.includes(task.author_id)
			)
			// .map((v) => {
			// 	console.log("1", v);
			// 	return v;
			// })
			.filter(
				(task) =>
					filter.assignees.length === 0 ||
					filter.assignees.includes(task.assignee_id)
			)
			// .map((v) => {
			// 	console.log("2", v);
			// 	return v;
			// })
			.filter(
				(task) =>
					filter.followers.length === 0 ||
					filter.followers.some((follower) =>
						task.follower_ids.includes(follower)
					)
			)
			// .map((v) => {
			// 	console.log("3", v);
			// 	return v;
			// })
			.filter(
				(task) =>
					filter.status === EMPTY_FILTER.status ||
					filter.status === task.status
			)
	);
	// .map((v) => {
	// 	console.log("4", v);
	// 	return v;
	// });
};
