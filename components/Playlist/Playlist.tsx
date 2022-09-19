import React from "react";
import styles from "./Playlist.module.scss";
import { IPrimary } from "../../slices/Song";
import { SliceLike, SliceZone, SliceZoneLike } from "@prismicio/react";
import { components } from "../../slices";
import {Lyrics} from "../Lyrics/Lyrics";

interface IPlaylist {
    slices: SliceZoneLike<SliceLike<string>>;
    songsList: IPrimary[];
    currentIndex: number;
    setSong: (data: number) => void;
}

export interface ISliceContext {
    setSong: (data: number) => void;
    currentIndex: number;
    songsList: IPrimary[];
}

export const Playlist = (props: IPlaylist) => {

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
                <SliceZone slices={props.slices} components={components} context={{
                    setSong: props.setSong,
                    songsList: props.songsList,
                    currentIndex: props.currentIndex
                } as ISliceContext} />
            </div>
        </div>

    );
};