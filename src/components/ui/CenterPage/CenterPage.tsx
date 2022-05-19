import {ReactNode} from "react";
import styles from './CenterPage.module.css';

export type CenterPageParams = {
    children: ReactNode
}

export const CenterPage = ({children}: CenterPageParams) => {
    return <div className={styles.page}>
        {children}
    </div>;
}