import {useField} from "formik";
import React, {useEffect, useRef, useState} from "react";
import styles from './Dropdown.module.css';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type DropdownProps = {
    name: string,
    choices: string[],
    loading?: boolean,
};

export const Dropdown = ({name, choices, loading}: DropdownProps) => {
    const [field, , helpers] = useField(name);

    const [open, setOpen] = useState(false);


    const close = (e: React.MouseEvent<HTMLSpanElement>) => {
        console.log('encanto');
        setOpen(v => !v);
        e.stopPropagation();
    };

    useEffect(() => {
        console.log('set');

        const open = (e: MouseEvent) => {
            setOpen(false);
            console.log('ppap');
        };
        window.addEventListener('click', open);
        console.log('hi1');

        return () => {
            window.removeEventListener('click', open);
        }
    }, []);

    const handleClick = (i: number) => {
        helpers.setValue(choices[i]);
    }

    if (loading) {
        return <Skeleton count={1} height={"25px"}/>
    }

    return (
        <div className={styles.container}>
            <span className={styles.selected} onClick={close}>{field.value}</span>
            <div className={`${styles.choices} ${open ? styles.choices_open : styles.choices_closed}`}>
                {choices.map((ch, i) =>
                    <span key={i} className={styles.option} onClick={() => handleClick(i)}>{ch}</span>
                )}
            </div>

        </div>
    );

};

