import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Outlet } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar'
import FriendsActivity from './components/FriendsActivity'
import AudioPlayer from './components/AudioPlayer'
import PlaybackControl from './components/PlaybackControl'
import { useEffect, useState } from 'react'

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className='h-screen bg-black text-white flex flex-col mt-2'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 flex overflow-hiddenp-2'>
        <AudioPlayer />
        {/* left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSideBar />
        </ResizablePanel>
        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        {!isMobile && (
          <>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
            {/* Right Sidebar */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
      <PlaybackControl />
    </div>
  )
}

export default MainLayout
