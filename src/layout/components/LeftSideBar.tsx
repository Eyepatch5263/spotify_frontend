import PlaylistSkeleton from '@/components/skeletons/PlaylistSkeleton'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useMusicStore } from '@/stores/useMusicStore'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, LibraryIcon, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const LeftSideBar = () => {
    const { albums, isLoading, fetchAlbums } = useMusicStore()
    useEffect(() => {
        fetchAlbums()
    }, [fetchAlbums])
    return (
        <div className='flex flex-col ml-2 gap-2 h-full'>
            {/* navigation Menu */}
            <div className='rounded-lg bg-zinc-900 p-4'>
                <div className='space-y-2'>
                    <Link to={'/'} className={cn(buttonVariants(
                        {
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800"
                        }
                    ))}>
                        <HomeIcon className='mr-2 size-6' />
                        <span className='hidden md:inline' style={{ fontSize: "16px" }}>Home</span>
                    </Link>

                    <SignedIn>
                        <Link to={'/chat'} className={cn(buttonVariants(
                            {
                                variant: "ghost",
                                className: "w-full justify-start text-white hover:bg-zinc-800"
                            }
                        ))}>
                            <MessageCircle className='mr-2 size-5' />
                            <span className='hidden md:inline' style={{ fontSize: "16px" }}>Messages</span>
                        </Link>
                    </SignedIn>
                </div>
                {/* library section */}
            </div>
            <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
                <div className='flex items-center justify-start mb-4'>
                    <div className='flex text-white px-2'>
                        <LibraryIcon className='mr-2 size-5' />
                        <span className='hidden md:inline'>Library</span>
                    </div>
                </div>
                <ScrollArea className='h-[calc(100vh-300px)]'>
                    <div className='space-y-5'>
                        {isLoading ? (<PlaylistSkeleton />) : (
                            albums.map((album) => (
                                <Link to={`/albums/${album._id}`} key={album._id} className='hover:bg-zinc-800 rounded-md flex items-center gap-4 p-2 cursor-pointer group'>
                                    <img src={album.imageUrl} alt='Playlist Img' className='size-12 rounded-md flex-shrink-0 object-cover' />
                                    <div className='flex-1 min-w-0 hidden md:block'>
                                        <p className='font-md truncate'>
                                            {album.title}
                                        </p>
                                        <p className='text-sm text-zinc-400 truncate'>
                                            Album &#8226; {album.artist}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default LeftSideBar
