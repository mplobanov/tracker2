import {ReactNode} from "react";
import styles from './Button.module.css';

type ButtonProps = {
    text: ReactNode,
    onClick: () => void,
    secondary?: boolean
}


export const Button = ({text, onClick, secondary}: ButtonProps) => {
    return <div className={`${styles.button} ${secondary ? styles.buttonSecondary : styles.buttonPrimary}`}>
        {text}
    </div>
};