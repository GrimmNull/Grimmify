import {useEffect, useRef, useState} from "react";
import {IPrimary} from "../../slices/Song";
import styles from "./BottomBar.module.scss";
import clsx from "clsx";

interface IProps {
    songInfo: IPrimary;
    changeNext: () => void;
    changePrev: () => void;
    lyricsActive: boolean;
    toggleLyrics: (arg: boolean) => void;
    setSeeker: (el: HTMLMediaElement) => void;
    setProgress: (arg: number) => void;
}

export const BottomBar = (props: IProps) => {
    const {songInfo, changeNext, changePrev, lyricsActive, toggleLyrics, setSeeker, setProgress} = props;
    const [playing, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(typeof Audio !== "undefined" && new Audio(""));
    const [currentProgress, setCurrentProgress] = useState(0);
    const currentSongRef = useRef<HTMLAudioElement>();
    const interval = useRef(0);

    useEffect(() => {
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
                currentSong.pause();
                currentSong.play().catch(() => setPlaying(false));
            } else {
                currentSong.pause();
            }
        }
    }, [playing]);

    useEffect(() => {
        if (!!currentSong && currentSong.duration) {
            currentSong.pause();
            setPlaying(true);
            currentSong.play().catch(() => setPlaying(false));
            setSeeker(currentSong);
            currentSongRef.current = currentSong;
            if (interval.current) {
                clearInterval(interval.current);
            }
            setInterval(() => {
                if (currentSongRef.current) {
                    setProgress(currentSongRef.current?.currentTime);
                    setCurrentProgress((currentSongRef.current?.currentTime * 100) / currentSongRef.current?.duration);
                }
            }, 300);
        }
    }, [currentSong]);

    const calculateSeek = (e: MouseEvent) => {
        if(currentSongRef.current) {
            const xProc = (e.clientX * 100) / window.innerWidth;
            currentSongRef.current.currentTime = (xProc * currentSongRef.current.duration) / 100
        }
    }


    return (<div className={styles.wrapper}>
        <div className={styles.topPart}>
            {/* aici adaugati ce detalii vreti, poze, nume, artist, album etc. */}
            <div className={styles.controlWrapper}>
                <div className={styles.songControlButton} onClick={changePrev}>
                    {"<"}
                </div>
                <div className={styles.button} onClick={() => setPlaying(!playing)}>
                    {playing ? "||" : ">"}
                </div>
                <div className={styles.songControlButton} onClick={changeNext}>
                    {">"}
                </div>
            </div>
            {songInfo.lyrics.length > 0 && <div className={styles.lyricsBtnWrapper}>
                <div className={clsx(styles.lyricsBtn, {[styles.btnActive]: lyricsActive})}
                     onClick={() => toggleLyrics(!lyricsActive)}>
                    |||
                </div>
            </div>}
        </div>
        {/*@ts-ignore*/}
        <div className={styles.progressWrapper} onClick={(e) => calculateSeek(e)}>
            <div className={styles.progress} style={{width: `${currentProgress}%`}}/>
        </div>
    </div>)

}

/*
x_px    innerWidth
x_proc    100%

x_proc = (x_px * 100) / innerWidth

time         songDuration
xProc         100%

time = (xProc * songDuration) / 100

 */