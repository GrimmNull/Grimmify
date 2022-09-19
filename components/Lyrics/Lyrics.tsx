import styles from "./Lyrics.module.scss";
import {IPrimary} from "../../slices/Song";
import {FunctionComponent, useEffect, useRef, useState} from "react";
import clsx from "clsx";

interface IProps {
    songInfo: IPrimary
    lyricsActive: boolean;
    currentSeek: number;
    songRef: HTMLMediaElement;
}

interface ILyricsMap {
    time: number;
    row: string;
}

const generateLyricsMap = (lyrics: string): ILyricsMap[] => {
    return lyrics.split("\n").map(row => {
        const [timestamp, lyric] = row.split("-");
        const [min, sec] = timestamp.trim().split(":");
        return {
            time: Number(min) * 60 + Number(sec),
            row: lyric.trim(),
        };
    });
}

const binarySearch = (elements: ILyricsMap[], time: number): number => {
    if(elements.length === 1) {
        return elements[0].time;
    }

    if (elements[Math.floor(elements.length/2)].time === time) {
        return elements[Math.floor(elements.length/2)].time;
    }

    return elements[Math.floor(elements.length/2)].time > time ? binarySearch(elements.slice(0, Math.floor(elements.length/2)), time) : binarySearch(elements.slice(Math.floor(elements.length/2), elements.length), time);
}

export const Lyrics: FunctionComponent<IProps> = (props) => {
    const {songInfo, lyricsActive, songRef, currentSeek} = props;
    const {lyrics} = songInfo;
    const [lyricsMap, setLyricsMap] = useState<ILyricsMap[] | boolean>(lyrics.length > 0 && generateLyricsMap(lyrics[0].text));
    const arrayOfRefs = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        if (lyrics.length > 0) {
            setLyricsMap(generateLyricsMap(lyrics[0].text));
        }
    }, [lyrics]);

    useEffect(() => {
        if (lyricsMap && (lyricsMap as ILyricsMap[]).length > 0) {
            const result = binarySearch(lyricsMap as ILyricsMap[], currentSeek);
            const currentRow = (lyricsMap as ILyricsMap[]).findIndex(row => row.time === result);
            arrayOfRefs.current[currentRow]?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [currentSeek])

    if (lyrics.length === 0) {
        return null;
    }

    return (<div className={styles.wrapper}>
        <div className={clsx(styles.screen, {[styles.lyricsActive]: lyricsActive})}>
            {lyricsMap && (lyricsMap as ILyricsMap[]).map((lyricsLine, index) => (<span key={lyricsLine.time}
                                                                               ref={el => arrayOfRefs.current[index] = el as HTMLSpanElement}
                                                                               className={clsx(styles.lyrics, {[styles.active]: currentSeek >= lyricsLine.time})}
                                                                               onClick={() => songRef.currentTime = lyricsLine.time}>{lyricsLine.row}</span>))}
        </div>
    </div>)
}