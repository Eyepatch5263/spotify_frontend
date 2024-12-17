import FeaturedGridSkeleton from '@/components/skeletons/FeaturedSkeleton'
import { Button } from '@/components/ui/button'
import { Song } from '@/types'
import { PlayButton } from './PlayButton'

type SectionGrid = {
    title: string,
    songs: Song[],
    isLoading: boolean
}
const SectionGrid = ({ title, songs, isLoading }: SectionGrid) => {
    if (isLoading) return <FeaturedGridSkeleton />
    return (
        <div className='mb-8'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl sm:text-2xl font-bold'>
                    {title}
                </h2>
                <Button variant="link" className='text-sm text-zinc-400 hover:text-white'>
                    Show All
                </Button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    songs.map((song) => (
                        <div key={song._id} className='bg-zinc-800/40 p-4 rounded-md group'>
                            <div className='relative'>
                                <div className='aspect-square rounded-md shadow-lg transition-all bg-zinc-700 mb-4 cursor-pointer'>
                                    <img src={song.imageUrl} alt={song.title} className='object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105' />
                                    {/* add a play button */}
                                </div>
                                <PlayButton song={song}/>
                            </div>

                            <p className='text-sm font-medium truncate'>
                                {song.title}
                            </p>
                            <p className='text-xs text-zinc-400 truncate'>
                                {song.artist}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SectionGrid
