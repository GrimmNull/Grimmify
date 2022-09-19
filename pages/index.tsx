import {SliceLike, SliceZoneLike} from '@prismicio/react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, {FunctionComponent, useState} from 'react'
import {BottomBar} from '../components/BottomBar/BottomBar'
import {Playlist} from '../components/Playlist/Playlist'
import {createClient} from '../prismicio'
import {IPrimary} from '../slices/Song'
import styles from '../styles/Home.module.css'
import {Lyrics} from "../components/Lyrics/Lyrics";

interface IProps {
    songs: SliceZoneLike<SliceLike<string>>;
}

const Home: FunctionComponent<IProps> = (props) => {
    // const [currentSong, setCurrentSong] = useState(props.songs[0].primary);
    const [currentSong, setCurrentSong] = useState(0);
    // @ts-ignore
    const [songsList, setSongsList] = useState<IPrimary[]>(props.songs.map(song => song.primary));
    const [lyricsActive, setLyricsActive] = useState<boolean>(false);
    const [currentSongProgress, setCurrentSongProgress] = useState(0);
    const [songRef, setSongRef] = useState<HTMLMediaElement>();

    return (
        <div className={styles.container}>
            <Head>
                <title>Grimmify</title>
                <meta name="description" content="Just a fun app to listen to music"/>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            <Lyrics songInfo={songsList[currentSong]} lyricsActive={lyricsActive} currentSeek={currentSongProgress}
                    songRef={songRef as HTMLMediaElement}/>
            <Playlist slices={props.songs} setSong={(data: number) => setCurrentSong(data)} songsList={songsList}
                      currentIndex={currentSong}/>
            <BottomBar songInfo={songsList[currentSong]}
                        changeNext={() => {
                            if (currentSong < songsList.length - 1) {
                                setCurrentSong(currentSong + 1);
                            } else {
                                setCurrentSong(0);
                            }
                        }}
                        changePrev={() => {
                            if (currentSong > 0) {
                                setCurrentSong(currentSong - 1);
                            } else {
                                setCurrentSong(songsList.length - 1);
                            }
                        }}
                        lyricsActive={lyricsActive}
                        toggleLyrics={setLyricsActive}
                        setProgress={setCurrentSongProgress}
                        setSeeker={setSongRef}/>
        </div>
    )
}

export const getServerSideProps = async () => {
    let notFound = false;
    let data;
    const client = createClient();

    try {
        data = await client.getByUID("playlist", "main");
    } catch (e) {
        console.error("The playlist was not found");
        notFound = true;
    }

    return {
        props: {songs: data?.data.slices},
        notFound: notFound
    }
}

export default Home
