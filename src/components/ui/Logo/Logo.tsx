import styles from './Logo.module.css';

type LogoParams = {
    onClick: () => void;
}

export const Logo = ({onClick}: LogoParams) => {
    return <div className={styles.logo} onClick={onClick}>🔥Tracker</div>
}