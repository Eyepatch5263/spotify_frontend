import { Route, Routes } from "react-router-dom";
import Homepage from "../src/pages/home/Homepage"
import AuthCallbackPage from "./pages/authcallback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import {Toaster} from 'react-hot-toast'
import NotFoundPage from "./pages/404/NotFoundPage";
function App() {

  return (
    <>
      <Routes>
        <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={'/authcallback'} />} />
        <Route path='/authcallback' element={<AuthCallbackPage />} />
        <Route path='/admin' element={<AdminPage/>} />
        <Route element={<MainLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
