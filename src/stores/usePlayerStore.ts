import { Song } from '@/types'
import { create } from 'zustand'
import { useChatStore } from './useChatStore'

interface PlayerStore {
    currentSong: Song | null,
    queue: Song[],
    isPlaying: boolean,
    currentIndex: number

    intializeQueue: (songs: Song[]) => void
    playAlbum: (songs: Song[], startIndex: number) => void
    setCurrentSong: (songs: Song | null) => void
    togglePlay: () => void
    playNextSong: () => void
    playPreviousSong: () => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    queue: [],
    isPlaying: false,
    currentIndex: -1,
    intializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex

        })
    },
    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return

        const song = songs[startIndex]
        const socket = useChatStore.getState().socket
        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `Playing ${song.title} by ${song.artist}`
            })
        }
        set({
            queue: songs,
            currentSong: songs[startIndex],
            currentIndex: startIndex,
            isPlaying: true
        })
    },
    setCurrentSong: (song: Song | null) => {
        if (!song) return

        const socket = useChatStore.getState().socket
        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `Playing ${song.title} by ${song.artist}`
            })
        }

        const songIndex = get().queue.findIndex(s => s._id === song._id)
        set({ currentSong: song, currentIndex: songIndex !== -1 ? songIndex : get().currentIndex, isPlaying: true })
    },
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying
        const currentSong = get().currentSong
        const socket = useChatStore.getState().socket
        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : "Paused"
            })
        }
        set({ isPlaying: !get().isPlaying })
    },
    playNextSong: () => {
        const nextIndex = get().currentIndex + 1
        if (nextIndex < get().queue.length) {
            const nextSong = get().queue[nextIndex]
            const socket = useChatStore.getState().socket
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Playing ${nextSong.title} by ${nextSong.artist}`
                })
            }
            set({ currentSong: get().queue[nextIndex], currentIndex: nextIndex, isPlaying: true })
        }
        else{
            set({isPlaying: false})
            const socket = useChatStore.getState().socket
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Paused`
                })
            }
        }

    },
    playPreviousSong: () => {
        const prevIndex = get().currentIndex - 1
        if (prevIndex >=0){
            const prevSong = get().queue[prevIndex]
            const socket = useChatStore.getState().socket
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Playing ${prevSong.title} by ${prevSong.artist}`
                })
            }
            set({ currentSong: get().queue[prevIndex], currentIndex: prevIndex, isPlaying: true })
        }
        else{
            set({isPlaying: false})
            const socket = useChatStore.getState().socket
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Paused`
                })
            }
        }
    },
}))