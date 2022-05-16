import styles from './Avatar.module.css';

type AvatarParams = {
    imageUrl?: string;
    name?: string;
    big?: boolean;
    reverse?: boolean;
    onClick?: () => void;
}

export const Avatar = ({imageUrl, name, big, reverse, onClick}: AvatarParams) => {
    const nameDiv =  <div className={`${styles.avatarName} ${big && styles.avatarNameBig}`}>{name}</div>;

    return (
        <div className={styles.avatar} onClick={onClick}>
            {reverse && name && nameDiv}
            <img src={imageUrl} alt={name} className={`${styles.avatarImage} ${big && styles.avatarImageBig}`}/>
            {!reverse && name && nameDiv}
        </div>
    );
}