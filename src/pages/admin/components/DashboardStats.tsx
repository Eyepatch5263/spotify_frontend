import { Library, ListMusic, LoaderPinwheel, PlayCircle, Users2 } from 'lucide-react';
import StatsCard from './StatsCard';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';

const DashboardStats = () => {
    const [stats, setStats] = useState({
        totalSongs: 0,
        totalAlbums: 0,
        totalArtist: 0,
        totalUsers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosInstance.get('/stats'); // Adjust the endpoint as necessary
                setStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statsData = [
		{
			icon: ListMusic,
			label: "Total Songs",
			value: stats.totalSongs,
			bgColor: "bg-emerald-500/10",
			iconColor: "text-emerald-500",
		},
		{
			icon: Library,
			label: "Total Albums",
			value: stats.totalAlbums,
			bgColor: "bg-violet-500/10",
			iconColor: "text-violet-500",
		},
		{
			icon: Users2,
			label: "Total Artists",
			value: stats.totalArtist,
			bgColor: "bg-orange-500/10",
			iconColor: "text-orange-500",
		},
		{
			icon: PlayCircle,
			label: "Total Users",
			value: stats.totalUsers,
			bgColor: "bg-sky-500/10",
			iconColor: "text-sky-500",
		},
	];
    if(loading){
        <LoaderPinwheel className='size-6 text-gray-500 animate-spin'/>
    }
    return (
        
        <div className='grid grid-cols-1 d:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            {statsData.map((stat, index) => (
                <StatsCard bgColor={stat.bgColor} value={stat.value} iconColor={stat.iconColor} key={index} label={stat.label} iconType={stat.icon}/>
            ))}
        </div>
    )
}

export default DashboardStats
