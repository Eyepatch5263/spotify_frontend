import { axiosInstance } from '@/lib/axios';
import { Albums, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface MusicStore {
    songs: Song[],
    albums: Albums[],
    isLoading: boolean,
    error: any | string,
    currentAlbum: Albums | null,
    madeForYouSong: Song[],
    trendingSong: Song[],
    featuredSong: Song[],
    stats:Stats,
    fetchAlbums: () => Promise<void>
    fetchAlbumById: (id: string) => Promise<void>
    fecthFeaturedSong: () => Promise<void>
    fetchTrendingSong: () => Promise<void>
    fetchMadeForYou: () => Promise<void>

    fetchStats: () => Promise<void>
    fetchSongs:()=> Promise<void>

    deleteSong: (id: string) => Promise<void>
    deleteAlbum: (id: string) => Promise<void>

}
export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    madeForYouSong: [],
    trendingSong: [],
    featuredSong: [],
    stats:{
        totalSongs:0, totalUsers:0, totalAlbums:0, totalArtist:0
    },
    fetchAlbums: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get('/albums')
            set({ albums: res.data })
        } catch (error: any) {
            set({ error: error.response })
        }
        finally {
            set({ isLoading: false })
        }
    },
    fetchAlbumById: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get(`/albums/${id}`)
            set({ currentAlbum: res.data })
        } catch (error: any) {
            set({ error: error.response })
        }
        finally {
            set({ isLoading: false })
        }
    },
    fetchTrendingSong: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get('/songs/trending')
            set({ trendingSong: res.data })
        } catch (error: any) {
            set({ error: error.response })
        }
        finally {
            set({ isLoading: false })
        }
    },
    fecthFeaturedSong: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get('/songs/featured')
            set({ featuredSong: res.data })
        } catch (error: any) {
            set({ error: error.response })
        }
        finally {
            set({ isLoading: false })
        }
    },
    fetchMadeForYou: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get('/songs/made-for-you')
            set({ madeForYouSong: res.data })
        } catch (error: any) {
            set({ error: error.response })
        }
        finally {
            set({ isLoading: false })
        }
    },
    fetchSongs:async()=>{
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get('/songs')
            set({ songs: res.data })
        } catch (error: any) {
            set({ error: error.response })
        }
        finally {
            set({ isLoading: false })
        }
    },
    fetchStats: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get('/stats')
            set({ stats: res.data })
        } catch (error: any) {
            set({ error: error.response })
        }
        finally {
            set({ isLoading: false })
        }
    },
    deleteSong: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.delete(`/admin/songs/${id}`)
            set(state=>({songs:state.songs.filter(s => s._id !== id)}))
            toast.success("Song deleted successfully")
        } catch (error: any) {
            toast.error("Error deleting the song", error)
        }
        finally {
            set({ isLoading: false })
        }
    },
    deleteAlbum: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.delete(`/admin/albums/${id}`)
            set(state=>({albums:state.albums.filter(a => a._id!== id),
                songs:state.songs.map((song)=>
                song.albumId===state.albums.find(a=>a._id===id)?.title?{...song, albumId:null}:song
            ),
            }))
            toast.success("Album deleted successfully")
        } catch (error: any) {
            toast.error("Error deleting the album", error)
        }
        finally {
            set({ isLoading: false })
        }
    }
}))
