import styles from "./AvatarChoice.module.css";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { UserArray } from "../../../utils/user";
import { Avatar } from "../Avatar/Avatar";
import { useField } from "formik";

export type AvatarChoiceProps = {
	name: string;
	choices: UserArray;
	loading?: boolean;
	singleChoice?: boolean;
	left?: boolean;
};

export const AvatarChoice = ({
	name,
	choices,
	loading,
	singleChoice,
	left,
}: AvatarChoiceProps) => {
	const [open, setOpen] = useState(false);
	const [field, , helpers] = useField<string[]>(name);

	const handleEditClick = () => {
		setOpen((v) => !v);
	};

	const [searchQuery, setSearchQuery] = useState("");
	// const [chosen, setChosen] = useState<Set<string>>(new Set(field.value));

	const handleClick = (uid: string) => {
		const prev = field.value;

		if (singleChoice) {
			helpers.setValue([uid]);
		}
		if (prev.find((v) => v === uid)) {
			helpers.setValue(prev.filter((v) => v !== uid));
		} else {
			prev.push(uid);
			helpers.setValue(prev);
		}
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
				className={`${styles.dropdown} ${open && styles.dropdownOpen} ${
					left ? styles.dropdownLeft : styles.dropdownRight
				}`}
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
								field.value.find((v) => v === choice.uid) &&
								styles.chosen
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
