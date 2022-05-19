import {ReactNode} from "react";
import styles from './Page.module.css';

export type PageParams = {
    children: ReactNode
}

export const Page = ({children}: PageParams) => {
    return <div className={styles.page}>
        {children}
    </div>;
}