import React from "react";
import { ISongInfo, Song } from "../Song/Song";
import styles from "./Playlist.module.scss";

const songList: ISongInfo[] = [
    {
        imageLink: "./assets/Led Zeppelin.jpeg",
        title: "Dazed and Confused",
        album: "Led Zeppelin",
        duration: "6:24"
    },
    {
        imageLink: "./assets/Creatures of habits.jpeg",
        title: "The Drunk",
        album: "Creatures of Habit",
        duration: "3:54"
    },
];

export const Playlist = () => {

    return (
        <div className={styles.playlist}>
            <div className={styles["table-header"]}>
                <span className={styles["song-nr"]}>
                    #
                </span>
                <span className={styles["song-cover"]}>
                    Cover
                </span>
                <span className={styles["song-title"]}>
                    Title
                </span>
                <span className={styles["song-album"]}>
                    Album
                </span>
                <span className={styles["song-duration"]}>
                    Duration
                </span>
            </div>
            <div id="songs-wrapper" className={styles["songs"]}>
                {/* <Song index={1} songInfo={songList[0]} /> */}
                {songList.map(function (details, index) {
                    return <Song index={index + 1} songInfo={details}  />
                })}
            </div>
        </div>

    );
};