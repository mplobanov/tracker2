import {ReactNode} from "react";
import styles from './Button.module.css';

type ButtonProps = {
    text: ReactNode,
    onClick: () => void,
    secondary?: boolean,
    disabled?: boolean
}


export const Button = ({text, onClick, secondary, disabled}: ButtonProps) => {
    return <div onClick={onClick} className={`${styles.button} ${secondary ? styles.buttonSecondary : styles.buttonPrimary} ${disabled && styles.disabled}`}>
        {text}
    </div>
};