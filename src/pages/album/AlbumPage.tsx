import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicStore } from "@/stores/useMusicStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Clock, PauseIcon, Play } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const AlbumPage = () => {
    const { albumId } = useParams()
    const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore()
    
    const gradients = [
        "from-[#29246a] via-[#210057] to-[#11152e]",
        "from-[#0f2027] via-[#203a43] to-[#2c5364]",
        "from-[#232526] via-[#414345] to-[#232526]",
        "from-[#141e30] via-[#243b55] to-[#141e30]",
        "from-[#000428] via-[#004e92] to-[#000428]"
    ]

    const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)]

    const [gradient, setGradient] = useState(getRandomGradient())

    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()
    const handlePlayAlbum = (index: number) => {
        playAlbum(currentAlbum?.songs!, index)
    }

    const toggleSongAlbum = () => {
        const isCurrentSongAlbumPlaying = currentAlbum?.songs.some(song => song._id === currentSong?._id)
        if (isCurrentSongAlbumPlaying) {
            togglePlay()
        }
        else {
            //start playing the album from beginning
            playAlbum(currentAlbum?.songs!, 0)
        }
    }

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remSecond = seconds % 60
        return `${minutes}:${remSecond.toString().padStart(2, '0')}`
    }

    useEffect(() => {
        if (albumId) {
            fetchAlbumById(albumId)
            setGradient(getRandomGradient())
        }
    }, [fetchAlbumById, albumId])

    if (isLoading) return null
    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md">
                {/* main content */}
                <div className="relative min-h-full">
                    {/* gradient */}
                    <div className={`absolute inset-0 w-full h-[53%] bg-gradient-to-b ${gradient} pointer-events-none`} aria-hidden="true" />
                    {/* content */}
                    <div>
                        <div className="relative z-10">
                            <div className="flex p-6 gap-6 pb-6">
                                
                                <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} className="w-[240px] h-[240px] shadow-xl rounded-md" />
                                <div className="flex flex-col justify-end">
                                    <p className="text-sm font-medium">
                                        Album
                                    </p>
                                    <h2 className="text-7xl font-bold my-4">
                                        {currentAlbum?.title}
                                    </h2>
                                    <div className="flex items-center gap-2 text-sm text-zinc-100">
                                        <span className="font-medium text-white">
                                            {currentAlbum?.artist} &#8226;
                                        </span>
                                        <span>{currentAlbum?.songs.length} &#8226;</span>
                                        <span>{currentAlbum?.releaseYear}</span>
                                    </div>
                                </div>
                            </div>
                            {/* play button */}
                            <div className="px-6 pb-8 flex items-center gap-6">
                                <Button onClick={toggleSongAlbum} size={'icon'} className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 hover:scale-105 transition-all">
                                    {isPlaying && currentAlbum!.songs.length ? <PauseIcon className="h-7 w-7 text-black" /> : <Play className="h-7 w-7 text-black font-bold" />
                                    }
                                </Button>
                            </div>

                            {/* table section */}
                            <div className="bg-black/20 backdrop-blur-sm">
                                {/* table header */}
                                <div
                                    className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/20'
                                >
                                    <div>#</div>
                                    <div>Title</div>
                                    <div>Released Date</div>
                                    <div>
                                        <Clock className='h-4 w-4' />
                                    </div>
                                </div>
                                {/* song list */}
                                <div className="px-6">
                                    <div className="space-y-2 py-4">
                                        {currentAlbum?.songs.map((song, index) => {
                                            const isCurrentSong = currentSong?._id === song._id
                                            return (
                                                <div onClick={() => { handlePlayAlbum(index) }} key={song._id} className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer">
                                                    <div className="flex items-center justify-center">
                                                        {
                                                            isCurrentSong && isPlaying ? (
                                                                <div className="size-4 text-green-500">
                                                                    ♫
                                                                </div>
                                                            ) : <span className="group-hover:hidden">{index + 1}</span>
                                                        }
                                                        {!isCurrentSong && (<Play className="h-4 w-4 hidden group-hover:block" />)}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <img src={song.imageUrl} alt={song.title} className="size-10" />
                                                        <div>
                                                            <div className="font-medium text-white">{song.title}
                                                            </div>
                                                            <div>{song.artist}</div>
                                                        </div>

                                                    </div>
                                                    <div className="flex items-center">
                                                        {song.createdAt.split('T')[0]}
                                                    </div>
                                                    <div className="flex items-center">
                                                        {formatDuration(song.duration)}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default AlbumPage
