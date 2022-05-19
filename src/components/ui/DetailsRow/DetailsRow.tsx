import React, {ReactNode} from "react";
import styles from './DetailsRow.module.css';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type DetailsRowParams = {
    header: string;
    loading?: boolean;
    children: ReactNode;
}

export const DetailsRow = ({header, children, loading}: DetailsRowParams) => {
    return (
        <div className={styles.detailsRow}>
            <div className={styles.detailsHeader}>
                {header}
            </div>
            {loading ? <Skeleton height={"2rem"}/> : <div>{children}</div>}
        </div>
    )
};