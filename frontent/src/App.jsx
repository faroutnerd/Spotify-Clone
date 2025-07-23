import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'

const App = () => {
  const { audioRef, track, songsData, albumsData } = useContext(PlayerContext);

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
      
      {/* Only add audio element when track exists and has a file property */}
      {track && track.file ? (
        <audio ref={audioRef} src={track.file} preload='auto'></audio>
      ) : null}
    </div>
  )
}

export default App