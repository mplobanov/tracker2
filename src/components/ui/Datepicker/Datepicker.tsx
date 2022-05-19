import {useField} from "formik";
import styles from './Datepicker.module.css'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export type DatepickerProps = {
    name: string,
    loading?: boolean,
};

export const Datepicker = ({name, loading}: DatepickerProps) => {
    const [field, ,] = useField<string>(name);

    if (loading) {
        return <Skeleton height={"25px"} />
    }

    return (
        <div>
            <input type={"datetime-local"} className={styles.datepicker} {...field} value={field.value.slice(0, 19)}/>
        </div>
    );
}