import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { GetStaticProps, NextPage } from 'next'
import { api } from '../services/api'
import { convertDuration } from '../util/convertDuration'

import Image from 'next/image'
import styles from './home.module.scss'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
type Episode = {
  id: string,
  title: string,
  members: string,
  thumbnail: string,
  description: string,
  duration: string,
  durationAsString: string,
  url: string,
  publishedAt: string
}

type HomeProps = {
  allEpisodes:Episode[],
  latestEpisodes: Episode[]
}

export default function Home({latestEpisodes,allEpisodes}: HomeProps) {
 
  const {play}= useContext(PlayerContext)


  return (
    <section className={styles.homepage} >
      <section className={styles.latestEpisodes}>
           
           <h2>Ultimos lançamentos</h2>
           <ul>
            {latestEpisodes.map(ep=>{
              return(
                <li key={ep.id}>
                     <img src={ep.thumbnail} alt={ep.title} width={122} height={122}  style={{objectFit:'cover'}} />

                     <div className={styles.episodeDetails}>
                       <a href={`/episodes/${ep.id}`}>{ep.title}</a>
                       <p>{ep.members}</p>
                       <span>{ep.publishedAt}</span>
                       <span>{ep.durationAsString}</span>
                      
                    <button type='button' onClick={()=>play(ep)}>
                             <img src="/play-green.svg" alt="" />
                    </button>

                     </div>
                </li>
             
              )
            })}
           </ul>
      </section>
      <section className={styles.allEpisodes}>
         <h2>Todos episódios</h2>
         <table cellSpacing={0}>
                <thead>
                  <th></th>
                  <th>Podcast</th>
                  <th>Integrantes</th>
                  <th>Data</th>
                  <th>Duração</th>
                  <th></th>
                </thead>

                <tbody>
                  {allEpisodes.map(episode=>{
                    return(
                      <tr key={episode.id}>
                         <td>
                           <img 
                           src={episode.thumbnail}
                            alt="" 
                            width={60}
                            height={60}
                            style={{objectFit:'cover'}}
                            />
                         </td>
                         <td>
                           <a href={`/episodes/${episode.id}`}>{episode.title}</a>
                         </td>
                         <td>{episode.members}</td>
                         <td style={{width:100}}>{episode.publishedAt}</td>
                         <td >{episode.durationAsString}</td>
                         <td>
                         <button type='button' onClick={()=>play(episode)}>
                             <img src="/play-green.svg" alt="" />
                    </button>
                         </td>
                      </tr>
                    )
                  })}
                </tbody>
         </table>
      </section>
    </section>
  )
}




export const getStaticProps: GetStaticProps = async () => {

  const response = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'

    }
  })
  const data = response.data

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDuration(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0,2)
  const allEpisodes = episodes.slice(2,episodes.length)
  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8 //a cada 8horas uma nova chamada será feita

  }
}


