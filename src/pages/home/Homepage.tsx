import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react'
import FeaturedSection from './components/FeaturedSection'
import SectionGrid from './components/SectionGrid'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useUser } from '@clerk/clerk-react'
import { axiosInstance } from '@/lib/axios'

const Homepage = () => {
  const { user } = useUser()
  const { fetchMadeForYou, fetchTrendingSong, fecthFeaturedSong, isLoading, trendingSong, featuredSong, madeForYouSong } = useMusicStore()
  useEffect(() => {
    fetchMadeForYou(),
      fetchTrendingSong(),
      fecthFeaturedSong()
  }, [fecthFeaturedSong, fetchMadeForYou, fetchTrendingSong])

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!user) return

        await axiosInstance.post('/auth/callback', {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        })
      } catch (error) {
        console.log(error);
        console.log("Error in auth callback")
      }
    }
    syncUser()
  }, [])

  const { intializeQueue } = usePlayerStore()

  useEffect(() => {
    if (madeForYouSong.length > 0 || fecthFeaturedSong.length > 0 || trendingSong.length > 0) {
      const allSongs = [...madeForYouSong, ...featuredSong, ...trendingSong]
      intializeQueue(allSongs)
    }
  }, [intializeQueue, madeForYouSong, featuredSong, trendingSong])
  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b bg-zinc-800/70 to-zinc-900'>
      <Topbar />
      <ScrollArea className='h-[calc(100vh-150px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>
            Good Afternoon
          </h1>
          <FeaturedSection />
          <div className='space-y-8'>
            <SectionGrid title="Made For You" songs={madeForYouSong} isLoading={isLoading} />
            <SectionGrid title="Trending" songs={trendingSong} isLoading={isLoading} />
          </div>
        </div>
      </ScrollArea>
    </main>
  )
}

export default Homepage
