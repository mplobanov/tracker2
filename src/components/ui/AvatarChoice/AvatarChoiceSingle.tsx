import styles from "./AvatarChoice.module.css";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { UserArray } from "../../../utils/user";
import { Avatar } from "../Avatar/Avatar";
import { useField } from "formik";

export type AvatarChoiceProps = {
	name: string;
	choices: UserArray;
	loading?: boolean;
};

export const AvatarChoiceSingle = ({
	name,
	choices,
	loading,
}: AvatarChoiceProps) => {
	const [open, setOpen] = useState(false);
	const [field, , helpers] = useField<string>(name);

	const handleEditClick = () => {
		setOpen((v) => !v);
	};

	const [searchQuery, setSearchQuery] = useState("");

	const handleClick = (uid: string) => {
		helpers.setValue(uid);
	};

	useEffect(() => {
		const close = () => {
			setOpen(false);
		};

		window.addEventListener("click", close);

		return () => {
			window.removeEventListener("click", close);
		};
	}, []);

	const handlePrevent = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value ?? "");
	};

	const filtered = useMemo(() => {
		return choices.filter((v) => v.user.name.includes(searchQuery));
	}, [choices, searchQuery]);

	return (
		<span className={styles.container} onClick={handlePrevent}>
			<span
				className={`material-symbols-outlined ${styles.edit}`}
				onClick={handleEditClick}
			>
				edit
			</span>
			<div
				className={`${styles.dropdown} ${open && styles.dropdownOpen}`}
			>
				<div className={styles.search}>
					<input
						className={styles.input}
						placeholder={"Поиск"}
						onChange={handleChange}
						autoFocus={true}
					/>
				</div>
				<div className={styles.results}>
					{filtered.map((choice, i) => (
						<span
							className={`${styles.elem} ${
								field.value === choice.uid && styles.chosen
							}`}
							onClick={() => handleClick(choice.uid)}
							key={i}
						>
							<Avatar
								imageUrl={choice.user.photoUrl}
								name={choice.user.name}
								loading={loading}
							/>
						</span>
					))}
				</div>
			</div>
		</span>
	);
};
