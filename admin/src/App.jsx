import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';

import AddSong from './pages/AddSong';
import ListAlbum from './pages/ListAlbum';
import ListSong from './pages/ListSong';
import AddAlbum from './pages/AddAlbum';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// export const url = "http://localhost:4000/api"
export const url = import.meta.env.VITE_BASE_URL;

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#f3fff7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path='/add-song' element={<AddSong />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-song' element={<ListSong />} />
            <Route path='/list-album' element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
