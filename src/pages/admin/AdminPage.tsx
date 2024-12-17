import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/useAuthStore"
import { Link } from "react-router-dom"
import Header from "./components/Header"
import DashboardStats from "./components/DashboardStats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Album, Music } from "lucide-react"
import SongsTabContent from "./components/SongsTabContent"
import AlbumTabContent from "./components/AlbumTabContent"
import { useEffect } from "react"
import { useMusicStore } from "@/stores/useMusicStore"

const AdminPage = () => {
    const { isAdmin, isLoading } = useAuthStore()
    if (!isAdmin && !isLoading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <h1 className="text-4xl md:text-6xl font-bold text-red-600">Not Authorized !!</h1>
                <p className="text-3xl md:text-4xl text-red-100">You do not have the necessary permissions to access this page</p>
                <p className="text-xl md:text-2xl">Return to <Button variant={"link"}><Link className="text-xl md:text-2xl" to={'/'}>Home</Link></Button> </p>
            </div>
        )
    }

    const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore()

    useEffect(() => {
        fetchAlbums()
        fetchSongs()
        fetchStats()
    }, [fetchAlbums, fetchSongs, fetchStats])
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-black/30 text-zinc-100 p-8">
            <Header />
            <DashboardStats />
            <Tabs defaultValue="songs" className="space-y-6">
                <TabsList className="bg-zinc-800/50 p-1">
                    <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
                        <Music className="mr-2 size-4" />
                        Music
                    </TabsTrigger>
                    <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
                        <Album className="mr-2 size-4" />
                        Album
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="songs">
                    <SongsTabContent />
                </TabsContent>
                <TabsContent value="albums">
                    <AlbumTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminPage
