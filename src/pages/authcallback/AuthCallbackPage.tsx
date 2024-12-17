import { Card, CardContent } from '@/components/ui/card'
import { useUser } from '@clerk/clerk-react'
import { LoaderPinwheel } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCallbackPage = () => {
    const {isLoaded,user}=useUser()
    const syncAttempted=useRef(false)
    const navigate=useNavigate()
    
    useEffect(()=>{
        const syncUser=async()=>{
            try {
                if(!user || !isLoaded || syncAttempted.current) return

            } catch (error) {
                console.log("Error in auth callback")
            }
            finally{
                navigate('https://api.github.com')
            }
        }
        syncUser()
    },[isLoaded,user,navigate])
    return (
        <div className='h-screen flex w-full bg-black items-center justify-center'>
            <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
                <CardContent className='flex flex-col items-center gap-4 pt-6'>
                    <LoaderPinwheel className='size-6 text-gray-500 animate-spin'/>
                    <h3 className='text-zinc-400 text-xl font-bold'>Logging You In</h3>
                    <p className='text-zinc-400 text-sm'>Redirecting....</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default AuthCallbackPage
