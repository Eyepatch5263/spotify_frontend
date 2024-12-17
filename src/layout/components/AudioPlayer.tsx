import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useRef } from 'react'

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const prevSongRef = useRef<String | null>(null)
    const { isPlaying, currentSong, playNextSong } = usePlayerStore()

    //play and pause logic
    useEffect(() => {
        
        if (isPlaying) audioRef.current?.play()
            
        else audioRef.current?.pause()
    }, [isPlaying])

    //handle song completion
    useEffect(() => {
        const audio = audioRef.current
        audio?.addEventListener('ended', () => {
            playNextSong()
        })
        return () => {
            audio?.removeEventListener('ended', () => { playNextSong() })
        }
    }, [playNextSong])

    //handle song changes
    useEffect(()=>{
        if(!audioRef.current || !currentSong) return
        const audio=audioRef.current
        //check if it is a new song
        const isSongChanged=prevSongRef.current!==currentSong?.audioUrl
        if(isSongChanged){
            audio.src=currentSong.audioUrl
            //reset the playback
            audio.currentTime=0
            prevSongRef.current=currentSong?.audioUrl

            if(isPlaying){
                audio.play()
            }
        }
    },[currentSong,isPlaying])

    return (
        <audio ref={audioRef}/>
    )
}

export default AudioPlayer
