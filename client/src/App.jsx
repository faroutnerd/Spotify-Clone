import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'

const App = () => {

  const {audioRef, track, songsData, albumsData} = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {
        songsData.length !== 0 
        ? <>
            <div className="h-[90%] flex">
              <Sidebar />
              <Display />
            </div>
            <Player />
          </>
        : null
      }
      
      <audio ref={audioRef} src={track ? track.file : ''} preload='auto'></audio>  {/* The preload='auto' attribute indicates that the browser should preload the audio file as soon as possible  */}
    </div>
  )
}

export default App
