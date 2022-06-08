import { parseISO } from "date-fns"
import format from "date-fns/format"
import { ptBR } from "date-fns/locale"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { api } from "../../services/api"
import { convertDuration } from "../../util/convertDuration"
import styles from './episode.module.scss'
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

type SlugProps = {
    episode: Episode,

}

interface IParams extends ParsedUrlQuery {
    slug: string
}

export default function Episode({ episode }: SlugProps) {


    const router = useRouter()
    return (
        <div className={styles.wrapper}>

   
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>

                <button type="button">
                    <img src="/arrow-left.svg" alt="Voltar" />
                </button>
                <img src={episode.thumbnail} alt="" width={700} height={160} style={{ objectFit: 'cover' }} />

                <button type="button">
                    <img src="/play.svg" alt="Tocar episódio" />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>

                <div className={styles.description} dangerouslySetInnerHTML={{__html:episode.description}} />
            </header>

        </div>
        </div>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { slug } = ctx.params as IParams

    const { data } = await api.get(`episodes/${slug}`)


    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        description: data.description,
        published_at: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        url: data.file.url,
        durationAsString: convertDuration(Number(data.file.duration)),
        duration: Number(data.file.duration)
    }


    return {
        props: {
            episode
        },
        revalidate: 60 * 60 * 24 //24hours
    }
}




