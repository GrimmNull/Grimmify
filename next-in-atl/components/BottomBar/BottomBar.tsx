import { useEffect, useRef, useState } from "react";
import { IPrimary } from "../../slices/Song";
import styles from "./BottomBar.module.scss";

interface IProps {
    songInfo: IPrimary;
    changeNext: () => void;
    changePrev: () => void;
}

export const BottomBar = (props: IProps) => {
    const songInfo = props.songInfo;
    const nextSong = props.changeNext;
    const prevSong = props.changePrev;
    const [playing, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(typeof Audio !== "undefined" && new Audio(""));
    const [currentProgress, setCurrentProgress] = useState(0);
    const currentSongRef = useRef<HTMLAudioElement>();
    const interval = useRef(0);

    useEffect(() => {
        console.log("I'll play: ", songInfo);
        const audio = songInfo.songlink && typeof Audio !== "undefined" && new Audio(songInfo.songlink?.url);
        if (audio) {
            if (!!currentSong) {
                currentSong.pause();
            }
            audio.preload = "metadata";
            audio.onloadedmetadata = () => setCurrentSong(audio);
        }
    }, [songInfo]);

    useEffect(() => {
        if (currentSong) {
            if (playing) {
                currentSong.play();
            } else {
                currentSong.pause();
            }
        }
    }, [playing]);

    useEffect(() => {
        if (!!currentSong && currentSong.duration) {
            setPlaying(true);
            currentSong.play();
            currentSongRef.current = currentSong;
            if (interval.current) {
                clearInterval(interval.current);
            }
            setInterval(() => {
                if (currentSongRef.current) {
                    setCurrentProgress(currentSongRef.current?.currentTime);
                }
            }, 300);
        }
    }, [currentSong]);


    return (<div className={styles.wrapper}>
        <div className={styles.topPart}>
            {/* aici adaugati ce detalii vreti, poze, nume, artist, album etc. */}
            <div className={styles.controlWrapper}>
                <div className={styles.songControlButton} onClick={prevSong}>
                    {"<"}
                </div>
                <div className={styles.button} onClick={() => setPlaying(!playing)} >
                    {playing ? "||" : ">"}
                </div>
                <div className={styles.songControlButton} onClick={nextSong}>
                    {">"}
                </div>
            </div>
        </div>
        <div className={styles.progressWrapper}>
            <div className={styles.progress} style={{ width: `${currentProgress/10}%` }} />
        </div>
    </div>)

}

/*
timp : 0 ...... x ..... currentSong.duration

width :0 ...... y ..... 100%


y = (100 * x) / currentSong.duration
*/