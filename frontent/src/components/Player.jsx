// import { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { PlayerContext } from '../context/PlayerContext';

// const Player = () => {

//   const {track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong} = useContext(PlayerContext);

//   return track ? (
//     <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
//       <div className="hidden lg:flex items-center gap-4">
//         <img className='w-12' src={track.image} alt="" />
//         <div>
//             <p>{track.name}</p>
//             <p>{track.desc.slice(0, 12)}</p>
//         </div>
//       </div>
//       <div className="flex flex-col items-center gap-1 m-auto">
//         <div className="flex gap-4">
//             <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
//             <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
//             {
//               playStatus
//               ?  <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
//               :  <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
//             }
//             <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
//             <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
//         </div>
//         <div className="flex items-center gap-5">
//             <p>{time.currentTime.minute}:{time.currentTime.second}</p>
//             <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
//                 <hr ref={seekBar} className={`h-1 border-none w-${0} bg-green-800 rounded-full`}/>
//             </div>
//             <p>{time.totalTime.minute}:{time.totalTime.second}</p>
//         </div>
//       </div>
//       <div className="hidden lg:flex items-center gap-2 opacity-75">
//         <img className='w-4' src={assets.play_icon} alt="" />
//         <img className='w-4' src={assets.mic_icon} alt="" />
//         <img className='w-4' src={assets.queue_icon} alt="" />
//         <img className='w-4' src={assets.speaker_icon} alt="" />
//         <img className='w-4' src={assets.volume_icon} alt="" />
//         <div className="w-20 bg-slate-50 h-1 rounded">
            
//         </div>
//         <img className='w-4' src={assets.mini_player_icon} alt="" />
//         <img className='w-4' src={assets.zoom_icon} alt="" />
//       </div>
//     </div>
//   ) : null
// }

// export default Player


import { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const {
    track, 
    seekBar, 
    seekBg, 
    playStatus, 
    play, 
    pause, 
    time, 
    previous, 
    next, 
    seekSong,
    volume,
    changeVolume,
    repeatMode,
    toggleRepeat,
    shuffle,
    toggleShuffle
  } = useContext(PlayerContext);

  // Format time to always show 2 digits
  const formatTime = (minutes, seconds) => {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className="hidden lg:flex items-center gap-4">
        <img className='w-12 rounded' src={track.image} alt="" />
        <div>
            <p className="text-sm font-medium">{track.name}</p>
            <p className="text-xs text-gray-400">{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4 items-center">
            <img 
              onClick={toggleShuffle}
              className={`w-4 cursor-pointer transition-opacity ${shuffle ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`} 
              src={assets.shuffle_icon} 
              alt="shuffle" 
            />
            <img onClick={previous} className='w-4 cursor-pointer hover:opacity-75' src={assets.prev_icon} alt="previous" />
            {
              playStatus
              ?  <img onClick={pause} className='w-4 cursor-pointer hover:opacity-75' src={assets.pause_icon} alt="pause" />
              :  <img onClick={play} className='w-4 cursor-pointer hover:opacity-75' src={assets.play_icon} alt="play" />
            }
            <img onClick={next} className='w-4 cursor-pointer hover:opacity-75' src={assets.next_icon} alt="next" />
            <img 
              onClick={toggleRepeat}
              className={`w-4 cursor-pointer transition-opacity ${
                repeatMode === 'off' ? 'opacity-50 hover:opacity-75' : 'opacity-100'
              }`} 
              src={assets.loop_icon} 
              alt="repeat"
            />
            {repeatMode === 'track' && (
              <span className="text-xs text-green-500 absolute ml-5 mt-3">1</span>
            )}
        </div>

        <div className="flex items-center gap-5">
            <p className="text-xs text-gray-300">
              {formatTime(time.currentTime.minute, time.currentTime.second)}
            </p>
            <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-600 rounded-full cursor-pointer h-1">
                <hr ref={seekBar} className="h-1 border-none bg-green-500 rounded-full transition-all duration-100"/>
            </div>
            <p className="text-xs text-gray-300">
              {formatTime(time.totalTime.minute, time.totalTime.second)}
            </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className='w-4 cursor-pointer hover:opacity-100' src={assets.play_icon} alt="" />
        <img className='w-4 cursor-pointer hover:opacity-100' src={assets.mic_icon} alt="" />
        <img className='w-4 cursor-pointer hover:opacity-100' src={assets.queue_icon} alt="" />
        <img className='w-4 cursor-pointer hover:opacity-100' src={assets.speaker_icon} alt="" />
        <img className='w-4 cursor-pointer hover:opacity-100' src={assets.volume_icon} alt="volume" />
        
        {/* Volume Control */}
        <div className="w-20 bg-gray-600 h-1 rounded-full relative cursor-pointer group">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={changeVolume}
            className="w-full h-1 bg-transparent appearance-none cursor-pointer absolute top-0 z-10 opacity-0"
          />
          <div 
            className="h-1 bg-green-500 rounded-full transition-all duration-100"
            style={{ width: `${volume}%` }}
          ></div>
          <div 
            className="w-3 h-3 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ left: `calc(${volume}% - 6px)` }}
          ></div>
        </div>

        <img className='w-4 cursor-pointer hover:opacity-100' src={assets.mini_player_icon} alt="" />
        <img className='w-4 cursor-pointer hover:opacity-100' src={assets.zoom_icon} alt="" />
      </div>
    </div>
  ) : null
}

export default Player