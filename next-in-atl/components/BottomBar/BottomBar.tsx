import { IPrimary } from "../../slices/Song";
import styles from "./BottomBar.module.scss";

interface IProps {
    songInfo: IPrimary;
    changeNext: () => void;
    changePrev: () => void;
}

export const BottomBar = (props: IProps) => {
    console.log(props);


    return (<div className={styles.wrapper}>

    </div>)

}