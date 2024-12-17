import { axiosInstance } from '@/lib/axios'
import { useAuthStore } from '@/stores/useAuthStore'
import { useChatStore } from '@/stores/useChatStore'
import { useAuth } from '@clerk/clerk-react'
import { LoaderPinwheel } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, userId } = useAuth()
    const [loading, setLoading] = useState(true)
    const {checkAdminStatus}=useAuthStore()
    const {initSocket,disconnectSocket}=useChatStore()
    const updateApiToken = (token: string | null) => {
        if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        else delete axiosInstance.defaults.headers.common['Authorization']
    }

    const initAuth = async () => {
        try {
            const token = await getToken()
            updateApiToken(token)
            if(token){
                await checkAdminStatus()
                if(userId) initSocket(userId)
            }
        } catch (error) {
            console.log("Error in auth provider")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initAuth()
        return()=>disconnectSocket()
    }, [getToken,userId,checkAdminStatus,initSocket,disconnectSocket])

    if (loading) return <div className='flex items-center h-screen w-full justify-center'>
        <LoaderPinwheel className='size-12 text-gray-300 animate-spin' />
    </div>
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider
