import React, {ReactNode} from "react";
import styles from './DetailsRow.module.css';

type DetailsRowParams = {
    header: string;
    children: ReactNode
}

export const DetailsRow = ({header, children}: DetailsRowParams) => {
    return (
        <div className={styles.detailsRow}>
            <div className={styles.detailsHeader}>
                {header}
            </div>
            {children}
        </div>
    )
};