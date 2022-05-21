import styles from "./Avatar.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MouseEventHandler } from "react";

type AvatarParams = {
	imageUrl?: string;
	name?: string;
	big?: boolean;
	reverse?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
	loading?: boolean;
};

export const Avatar = ({
	imageUrl,
	name,
	big,
	reverse,
	onClick,
	loading,
}: AvatarParams) => {
	const nameDiv = (
		<div className={`${styles.avatarName} ${big && styles.avatarNameBig}`}>
			{loading ? <Skeleton width={"5rem"} height={"1.5rem"} /> : name}
		</div>
	);

	return (
		<div className={styles.avatar} onClick={onClick}>
			{reverse && name && nameDiv}
			{loading ? (
				<Skeleton
					circle={true}
					className={`${styles.avatarImage} ${
						big && styles.avatarImageBig
					}`}
					containerClassName={`${styles.avatarImage} ${
						big && styles.avatarImageBig
					}`}
				/>
			) : (
				<img
					src={imageUrl}
					alt={name}
					className={`${styles.avatarImage} ${
						big && styles.avatarImageBig
					}`}
				/>
			)}

			{!reverse && name && nameDiv}
		</div>
	);
};
