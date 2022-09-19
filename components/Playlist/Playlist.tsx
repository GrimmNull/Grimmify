import React from "react";
import styles from "./Playlist.module.scss";
import { IPrimary } from "../../slices/Song";
import { SliceLike, SliceZone, SliceZoneLike } from "@prismicio/react";
import { components } from "../../slices";
import {IAlbum} from "../../pages";

interface IPlaylist {
    albumInfo: IAlbum;
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
    const { albumInfo, songsList, slices, currentIndex, setSong } = props;

    return (
        <div className={styles.playlist}>
            <div className={styles.infoPart}>
                <div style={{ backgroundImage: `url(${albumInfo?.albumCover.url})`}} className={styles.albumCover} />
                <div className={styles.playlistInfo}>
                    <span className={styles.albumTitle}>{albumInfo?.title}</span>
                    <span className={styles.albumDescription}>{albumInfo?.description}</span>
                </div>
            </div>
            <div className={styles.playlistPart}>
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
                    <SliceZone slices={slices} components={components} context={{
                        setSong: setSong,
                        songsList: songsList,
                        currentIndex: currentIndex
                    } as ISliceContext} />
                </div>
            </div>
        </div>

    );
};