import { useContext, useEffect, useRef } from 'react'
import { PlayerContext } from '../../context/PlayerContext'
import styles from './styles.module.scss'

import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
export function Player() {


    const { currentEpisodeIndex,
        episodeList,
        isPlaying,
        tooglePlay } = useContext(PlayerContext)

    const episode = episodeList[currentEpisodeIndex]

    const audioref = useRef<HTMLAudioElement>(null)


    useEffect(() => {

        if (!audioref.current) {
            return
        }

        if (isPlaying) {
            audioref.current?.play()
        } else {
            audioref.current?.pause()
        }
    }, [isPlaying])

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="" />
                <strong>Tocando agora </strong>
            </header>

            {episode ? <div className={styles.currentEpisode}>
                <img width={192} height={192} src={episode.thumbnail} alt="" style={{ objectFit: 'cover' }} />
                <strong>{episode.title}</strong>
                <p>{episode.members}</p>
            </div> : <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>}

            <footer>
                <div className={styles.progress}>
                    <span>00:00</span>
                    {episode ? <Slider

                        handleStyle={{
                            backgroundColor: '#9f75ff'
                        }}
                        railStyle={{
                            backgroundColor: '#9f75ff'
                        }}
                        trackStyle={{
                            backgroundColor: '#04d361'
                        }
                        } /> : <div className={styles.emptySlider}></div>}
                    <span>00:00</span>
                </div>


                {episode &&
                    <audio
                        src={episode.url}
                        autoPlay
                        ref={audioref}
                    >
                    </audio>}
                <div className={styles.buttons}>
                    <button disabled={!episode}>
                        <img src="/shuffle.svg" alt="" />
                    </button>
                    <button disabled={!episode}>
                        <img src="/play-previous.svg" alt="" />
                    </button>
                    <button className={styles.play} disabled={!episode} onClick={tooglePlay}>
                        {isPlaying ? <img src="/pause.svg" alt="" /> : <img src="/play.svg" alt="" />}
                    </button>

                    <button disabled={!episode}>
                        <img src="/play-next.svg" alt="" />
                    </button>
                    <button disabled={!episode}>
                        <img src="/repeat.svg" alt="" />
                    </button>

                </div>
            </footer>
        </div>

    )
}