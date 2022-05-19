import styles from './Slug.module.css';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import {useState} from "react";

type SlugParams = {
    text: string,
    textToCopy?: string,
    copy?: boolean,
    loading?: boolean,
}

export const Slug = ({text, copy=true, textToCopy, loading}: SlugParams) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = async () => {
         await navigator.clipboard.writeText(textToCopy ?? text);
         setClicked(val => !val);
    };

    if (loading) {
        return <Skeleton height={"2.2rem"} width={"10rem"}/>
    }

    return (
        <span className={styles.slug} onClick={handleClick}>
            {text}
            {copy && <span className={`material-symbols-outlined ${styles.copyIcon}`}>{clicked ? "check" : "content_copy"}</span>}
        </span>
    );
}