import { useState } from "react";
import { IPrimary } from "../../slices/Song";
import styles from "./BottomBar.module.scss";

interface IProps {
    songInfo: IPrimary;
    changeNext: () => void;
    changePrev: () => void;
}

export const BottomBar = (props: IProps) => {
    const [playing, setPlaying] = useState(false);


    return (<div className={styles.wrapper}>
        <div className={styles.button} onClick={() => setPlaying(!playing)} >
            {playing ? "||" : ">"}
        </div>
    </div>)

}