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

const SvgComponent = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height={1000} width={1000} viewBox={"0 0 30 30"} {...props}>
        <title>{"ui-record"}</title>
        <path
            fill={props.color}
            d="M917.7 273.5c-8.1 9.1-18.5 13.8-31 10.8-13.1-3.1-21.3-11.7-23.5-25.1-3.6-21.7-9.3-42.7-18.3-62.9-40.2-89.9-137.1-144.9-234.8-133-10.9 1.3-21.4 1.6-30.4-6-9.8-8.4-13.6-19.1-10.2-31.5 3.4-12.6 11.9-20.6 25-22.6C619-.6 643.6-1 668.2 1.8c63 7.3 118.2 32.3 164.7 75.2 50 46.1 80.1 103.2 90.5 170.5 1.5 9.4-.1 17.9-5.7 26zM756.1 132.4c42.1 32.5 67.9 75.3 76.4 128.3 3 18.5-7.9 34.2-25.2 36.9-17.5 2.8-32.2-8.5-35.5-27.2-13.3-76-76.5-123.5-153.9-115.8-15.6 1.6-26.9-3.9-33.2-16-5.7-11-4.2-24.5 3.9-34.2 5.4-6.4 12.5-9.6 20.7-10.6 54-6.7 102.8 6.1 146.8 38.6zm-33.7 216.7c10.1 72-.6 137.1-61.3 185.9-43.6 35.1-59.3 35.4-103.2 2.3-52.7-39.7-104.9-80.1-158.8-118.2-21.7-15.3-25.6-32-20-56 16.8-71.4 61.3-116.6 131-133.8 66.3-16.3 124.8 2.2 171 53.8 11.6 12.9 21.5 27.3 32.2 41 3.1 8.4 6.1 16.7 9.1 25zM344.6 457.8c70.2 52.6 137 102.7 207.9 155.8-125.1 129-248.2 255.9-374.7 386.4-33.6-23.9-66.4-47.4-102.2-72.9 89.6-156.5 177.9-310.5 269-469.3z"
        />
    </svg>
)

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
                    <img src={"./assets/ui-previous.svg"} alt={""} />
                </div>
                <div className={styles.button} onClick={() => setPlaying(!playing)}>
                    <img src={playing ? "./assets/ui-pause.svg" : "./assets/ui-play.svg"} alt={""} />
                </div>
                <div className={styles.songControlButton} onClick={changeNext}>
                    <img src={"./assets/ui-next.svg"} alt={""} />
                </div>
            </div>
            {songInfo.lyrics.length > 0 && <div className={styles.lyricsBtnWrapper}>
                <div className={clsx(styles.lyricsBtn, {[styles.btnActive]: lyricsActive})}
                     onClick={() => toggleLyrics(!lyricsActive)}>
                    <SvgComponent color={"#fff"} viewBox={"0 0 60 60"} />
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