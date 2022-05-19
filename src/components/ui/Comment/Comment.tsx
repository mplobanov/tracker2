import styles from './Comment.module.css';
import {User} from '../../../services/openapi'
import {useField} from "formik";
import {Comment as CommentDTO} from "../../../services/openapi";
import {useEffect, useMemo, useState} from "react";
import {Avatar} from "../Avatar/Avatar";
import TextareaAutosize from "react-textarea-autosize";
import moment from "moment";
import Skeleton from "react-loading-skeleton";


export type CommentProps = {
    name: string,
    loading?:boolean,
    getUserByAuthorId: (author_id: string) => Promise<User>,
    getCurrentUserId: () => string,
    placeholder?: string,
    hideFooter?: boolean,
    onAvatarClick: () => void,
};

export const Comment = ({name, loading, getUserByAuthorId, getCurrentUserId, placeholder, hideFooter, onAvatarClick}: CommentProps) => {
    const [field, ,] = useField<CommentDTO>(name);
    const [fieldText, ,] = useField(`${[name, "text"].filter(s => s).join('.')}`);

    const editable = useMemo(() => field.value.author_id ===  getCurrentUserId(), [field.value.author_id, getCurrentUserId]);

    const [author, setAuthor] = useState<User>();

    useEffect( () => {
        const f = async () => {
            setAuthor(await getUserByAuthorId(field.value.author_id));
        }
        f();
    }, [field.value.author_id, getUserByAuthorId]);


    const createdAt = useMemo(() => {
        return moment(field.value.created_at).fromNow()
    }, [field.value.created_at]);

    return (
        <div className={styles.comment}>
            <div>
                <Avatar imageUrl={author?.photoUrl} loading={!Boolean(author) || loading} big={true} onClick={onAvatarClick}/>
            </div>
            <div className={styles.body}>
                <div className={styles.textareaContainer}>
                    {loading ? <Skeleton count={3}/>: <TextareaAutosize {...fieldText}
                                                   disabled={!editable}
                                                   className={styles.textarea}
                                                   placeholder={placeholder ?? ''}
                    />}

                </div>
                {!hideFooter && !loading && <div className={styles.footer}>

                    <span>
                        {author?.name}
                    </span>
                    <span>•</span>
                    <span>
                        {createdAt}

                    </span>

                </div>}
                {!hideFooter && loading && <div className={styles.footer}>

                    <Skeleton width={"10rem"}/>

                </div>}

            </div>
        </div>
    );
};