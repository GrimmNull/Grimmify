import React from 'react'
import { PrismicRichText } from '@prismicio/react'
import styles from "./Song.module.scss";

interface IImage {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string | null;
  copyright: string | null;
  url: string;
}

export interface IPrimary {
  title: string;
  album: string;
  cover: IImage;
  songLink: {
    link_type: string;
    url: string;
  }
}

export interface IProps {
  slice: { primary: IPrimary };
}

const Song = ({ slice }: IProps) => {
  

  return (
    <div className={styles["melody"]}>
      <span className={styles["song-nr"]}>
        1
      </span>
      <img src={slice.primary.cover.url} className={styles["song-cover"]}>
      </img>
      <span className={styles["song-title"]}>
        {slice.primary.title}
      </span>
      <span className={styles["song-album"]}>
        {slice.primary.album}
      </span>
      <span className={styles["song-duration"]}>
        -
      </span>
    </div>
  );
}

export default Song