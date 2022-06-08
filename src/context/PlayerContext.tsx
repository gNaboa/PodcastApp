import {createContext, ReactNode, useState} from 'react'

type Episode={
    title:string,
    members:string,
    thumbnail:string,
    duration:string,
    url:string
}

type PlayerContextData ={
    episodeList:Episode[],
    currentEpisodeIndex:number,
    play:(episode:Episode) => void,
    isPlaying:boolean,
    tooglePlay:()=>void
}


export const PlayerContext = createContext({} as PlayerContextData)

 
type providerProps= {

    children:ReactNode
}

export function PlayerContextProvider({children}:providerProps){


     const [episodeList, setEpisodeList] = useState([])
     const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
     const [ isPlaying,setIsPlaying] = useState(false)

     function play(episode: any){
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
     }

     function tooglePlay(){
         setIsPlaying(!isPlaying)
     }

    return( 
       <PlayerContext.Provider value={{currentEpisodeIndex,episodeList,play,isPlaying,tooglePlay}}>
           {children}
        </PlayerContext.Provider>
    )
}