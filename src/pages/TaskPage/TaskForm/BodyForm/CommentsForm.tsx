import styles from "../../TaskPage.module.css";
import { DefaultService } from "../../../../services/openapi";
import { useField } from "formik";
import { useUser } from "../../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Comment as CommentDTO } from "../../../../services/openapi";
import { Comment } from "../../../../components/ui/Comment/Comment";
import { getSimpleName } from "../../../../utils/forms";

export type CommentsFormProps = {
	name: string;
};

export const CommentsForm = ({ name }: CommentsFormProps) => {
	const [field, ,] = useField(name);

	const comments: CommentDTO[] = useMemo(() => field.value, [field.value]);

	const { user } = useUser();
	const navigate = useNavigate();

	const getPlaceholder = (i: number, n: number, name: string) => {
		if (i + 1 === n) {
			return `${name}, напишите ${n > 1 ? "и вы" : ""} что-нибудь`;
		} else {
			return "Удалим этот комментарий";
		}
	};

	return (
		<div className={styles.comments}>
			{[...Array(comments.length ?? 0)].map((x, i) => {
				return (
					<Comment
						key={i}
						name={`${name}[${i}]`}
						getUserByAuthorId={(uid: string) =>
							DefaultService.getUserUserUidGet(uid)
						}
						getCurrentUserId={() => user?.uid ?? ""}
						placeholder={getPlaceholder(
							i,
							comments.length,
							getSimpleName(user?.displayName)
						)}
						hideFooter={comments.length === i + 1}
						onAvatarClick={() =>
							navigate(`/user/${comments.at(i)?.author_id}`)
						}
					/>
				);
			})}
		</div>
	);
};
