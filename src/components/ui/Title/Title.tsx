import {useField} from "formik";
import styles from './Title.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export type TitleProps = {
    name: string,
    small?: boolean,
    loading?: boolean,
    placeholder?: string,
}

export const Title: React.FC<TitleProps> = ({name, small, loading, placeholder}: TitleProps) => {
    const [field, ,] = useField(name);

    if (loading) {
        return <Skeleton className={`${small ? styles.smallSkeleton : styles.bigSkeleton}`} count={small ? 3 : 1} containerClassName={styles.skeletonContainer}/>
    }

    return (
        <TextareaAutosize{...field} className={`${styles.title} ${small ? styles.small : styles.big}`} placeholder={placeholder}/>
    );
}

Title.displayName = 'Title';