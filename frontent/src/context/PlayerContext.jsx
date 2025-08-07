// // import axios from "axios";

// // import { createContext, useEffect, useRef, useState } from "react";

// // export const PlayerContext = createContext();

// // const PlayerContextProvider = (props) => {

// //     const audioRef = useRef();
// //     const seekBg = useRef();    // This is the background of the seek bar -> Player.jsx
// //     const seekBar = useRef();   // This is the actual seek bar that moves when the audio is playing <hr/> -> Player.jsx

// //     const url = import.meta.env.VITE_BASE_URL

// //     const [songsData, setSongsData] = useState([]);
// //     const [albumsData, setAlbumsData] = useState([]);
    
// //     const [track, setTrack] = useState(songsData[0]);
// //     const [playStatus, setPlayStatus] = useState(false); 
// //     const [time, setTime] = useState({
// //         currentTime: {
// //             second: 0,
// //             minute: 0
// //         },
// //         totalTime: {
// //             second: 0,
// //             minute: 0
// //         }
// //     })

// //     const play = () => {
// //         audioRef.current.play();
// //         setPlayStatus(true);
// //     }

// //     const pause = () => {
// //         audioRef.current.pause();
// //         setPlayStatus(false);
// //     }

// //     const playWithId = async (id) => {
// //         await songsData.map((item) => {
// //             if (id === item._id) {
// //                 setTrack(item);
// //             }
// //         });
// //         await audioRef.current.play();
// //         setPlayStatus(true);
// //     }

// //     const previous = async () => {
// //         songsData.map(async (item, index) => {
// //             if (track._id === item._id && index > 0) {
// //                 await setTrack(songsData[index - 1])
// //                 await audioRef.current.play();
// //                 setPlayStatus(true)
// //             }
// //         })
// //     }

// //     const next = async () => {
// //         songsData.map(async (item, index) => {
// //             if (track._id === item._id && index < songsData.length) {
// //                 await setTrack(songsData[index + 1])
// //                 await audioRef.current.play();
// //                 setPlayStatus(true)
// //             }
// //         })
// //     }

// //     const seekSong = async (e) => {
// //         // offsetX is the distance from the left of the seek bar to the click position
// //         audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
// //     }

// //     const getSongsData = async () => {
// //         try {
// //             const response = await axios.get(`${url}/song/list`);
// //             setSongsData(response.data.songs);
// //             setTrack(response.data.songs[0]);

// //         } catch (error) {
            
// //         }
// //     }

// //     const getAlbumsData = async () => {
// //         try {
// //             const response = await axios.get(`${url}/album/list`);
            
// //             setAlbumsData(response.data.albums);
// //         } catch (error) {
            
// //         }
// //     }

// //     useEffect(() => {
// //         setTimeout(() => {
// //             audioRef.current.ontimeupdate = () => {

// //                 // how much time has passed since the song started playing
// //                 seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))+"%"

// //                 setTime({
// //                     currentTime: {
// //                         second: Math.floor(audioRef.current.currentTime % 60),
// //                         minute: Math.floor(audioRef.current.currentTime / 60)
// //                     },
// //                     totalTime: {
// //                         second: Math.floor(audioRef.current.duration % 60),
// //                         minute: Math.floor(audioRef.current.duration / 60)
// //                     }
// //                 })
// //             }
// //         }, 1000)
// //     }, [audioRef])

// //     useEffect(() => {
// //         getSongsData();
// //         getAlbumsData();
// //     }, [])

// //     const contextValue = {
// //         audioRef,
// //         seekBg,
// //         seekBar,
// //         track, setTrack,
// //         playStatus, setPlayStatus,
// //         time, setTime,
// //         play, pause,
// //         playWithId,
// //         previous, next,
// //         seekSong,
// //         songsData,
// //         albumsData,
// //     }

// //     return (
// //         <PlayerContext.Provider value={contextValue}>
// //             {props.children}
// //         </PlayerContext.Provider>
// //     )

// // }

// // export default PlayerContextProvider;

// import axios from "axios";

// import { createContext, useEffect, useRef, useState } from "react";

// export const PlayerContext = createContext();

// const PlayerContextProvider = (props) => {

//     const audioRef = useRef();
//     const seekBg = useRef();    // This is the background of the seek bar -> Player.jsx
//     const seekBar = useRef();   // This is the actual seek bar that moves when the audio is playing <hr/> -> Player.jsx

//     const url = import.meta.env.VITE_BASE_URL

//     const [songsData, setSongsData] = useState([]);
//     const [albumsData, setAlbumsData] = useState([]);
    
//     const [track, setTrack] = useState(songsData[0]);
//     const [playStatus, setPlayStatus] = useState(false); 
//     const [volume, setVolume] = useState(50);
//     const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'track', 'all'
//     const [shuffle, setShuffle] = useState(false);
//     const [time, setTime] = useState({
//         currentTime: {
//             second: 0,
//             minute: 0
//         },
//         totalTime: {
//             second: 0,
//             minute: 0
//         }
//     })

//     const play = () => {
//         audioRef.current.play();
//         setPlayStatus(true);
//     }

//     const pause = () => {
//         audioRef.current.pause();
//         setPlayStatus(false);
//     }

//     const playWithId = async (id) => {
//         await songsData.map((item) => {
//             if (id === item._id) {
//                 setTrack(item);
//             }
//         });
//         await audioRef.current.play();
//         setPlayStatus(true);
//     }

//     const previous = async () => {
//         songsData.map(async (item, index) => {
//             if (track._id === item._id && index > 0) {
//                 await setTrack(songsData[index - 1])
//                 await audioRef.current.play();
//                 setPlayStatus(true)
//             }
//         })
//     }

//     const next = async () => {
//         if (shuffle) {
//             // Random next song
//             const randomIndex = Math.floor(Math.random() * songsData.length);
//             await setTrack(songsData[randomIndex]);
//             await audioRef.current.play();
//             setPlayStatus(true);
//         } else {
//             songsData.map(async (item, index) => {
//                 if (track._id === item._id && index < songsData.length - 1) {
//                     await setTrack(songsData[index + 1])
//                     await audioRef.current.play();
//                     setPlayStatus(true)
//                 } else if (track._id === item._id && index === songsData.length - 1 && repeatMode === 'all') {
//                     // Loop back to first song if repeat all is enabled
//                     await setTrack(songsData[0]);
//                     await audioRef.current.play();
//                     setPlayStatus(true);
//                 }
//             })
//         }
//     }

//     const seekSong = async (e) => {
//         // offsetX is the distance from the left of the seek bar to the click position
//         audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
//     }

//     const changeVolume = (e) => {
//         const newVolume = e.target.value;
//         setVolume(newVolume);
//         audioRef.current.volume = newVolume / 100;
//     }

//     const toggleShuffle = () => {
//         setShuffle(!shuffle);
//     }

//     const toggleRepeat = () => {
//         const modes = ['off', 'all', 'track'];
//         const currentIndex = modes.indexOf(repeatMode);
//         const nextIndex = (currentIndex + 1) % modes.length;
//         setRepeatMode(modes[nextIndex]);
//     }

//     const getSongsData = async () => {
//         try {
//             const response = await axios.get(`${url}/song/list`);
//             setSongsData(response.data.songs);
//             setTrack(response.data.songs[0]);

//         } catch (error) {
            
//         }
//     }

//     const getAlbumsData = async () => {
//         try {
//             const response = await axios.get(`${url}/album/list`);
            
//             setAlbumsData(response.data.albums);
//         } catch (error) {
            
//         }
//     }

//     useEffect(() => {
//         setTimeout(() => {
//             if (audioRef.current) {
//                 audioRef.current.ontimeupdate = () => {
//                     // how much time has passed since the song started playing
//                     seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))+"%"

//                     setTime({
//                         currentTime: {
//                             second: Math.floor(audioRef.current.currentTime % 60),
//                             minute: Math.floor(audioRef.current.currentTime / 60)
//                         },
//                         totalTime: {
//                             second: Math.floor(audioRef.current.duration % 60),
//                             minute: Math.floor(audioRef.current.duration / 60)
//                         }
//                     })
//                 }

//                 // Handle song end
//                 audioRef.current.onended = () => {
//                     if (repeatMode === 'track') {
//                         audioRef.current.currentTime = 0;
//                         audioRef.current.play();
//                     } else {
//                         next();
//                     }
//                 }
//             }
//         }, 1000)
//     }, [audioRef, repeatMode])

//     useEffect(() => {
//         getSongsData();
//         getAlbumsData();
//     }, [])

//     // Set initial volume
//     useEffect(() => {
//         if (audioRef.current) {
//             audioRef.current.volume = volume / 100;
//         }
//     }, [audioRef, volume])

//     const contextValue = {
//         audioRef,
//         seekBg,
//         seekBar,
//         track, setTrack,
//         playStatus, setPlayStatus,
//         time, setTime,
//         play, pause,
//         playWithId,
//         previous, next,
//         seekSong,
//         songsData,
//         albumsData,
//         volume, setVolume, changeVolume,
//         repeatMode, toggleRepeat,
//         shuffle, toggleShuffle
//     }

//     return (
//         <PlayerContext.Provider value={contextValue}>
//             {props.children}
//         </PlayerContext.Provider>
//     )

// }

// export default PlayerContextProvider;

import axios from "axios";

import { createContext, useEffect, useRef, useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();    // This is the background of the seek bar -> Player.jsx
    const seekBar = useRef();   // This is the actual seek bar that moves when the audio is playing <hr/> -> Player.jsx

    const url = import.meta.env.VITE_BASE_URL

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false); 
    const [volume, setVolume] = useState(50);
    const [previousVolume, setPreviousVolume] = useState(50);
    const [isMuted, setIsMuted] = useState(false);
    const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'track', 'all'
    const [shuffle, setShuffle] = useState(false);
    const [shuffleHistory, setShuffleHistory] = useState([]);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id === item._id) {
                setTrack(item);
            }
        });
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {
        if (shuffle && shuffleHistory.length > 0) {
            // Go back in shuffle history
            const previousIndex = shuffleHistory[shuffleHistory.length - 1];
            setShuffleHistory(prev => prev.slice(0, -1));
            await setTrack(songsData[previousIndex]);
            await audioRef.current.play();
            setPlayStatus(true);
        } else {
            const currentIndex = songsData.findIndex(item => item._id === track._id);
            if (currentIndex > 0) {
                await setTrack(songsData[currentIndex - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
    }

    const next = async () => {
        if (shuffle) {
            // Get available songs (excluding current track and recent history)
            const currentIndex = songsData.findIndex(item => item._id === track._id);
            let availableIndexes = songsData
                .map((_, index) => index)
                .filter(index => index !== currentIndex && !shuffleHistory.includes(index));
            
            // If all songs played, reset history but keep current song excluded
            if (availableIndexes.length === 0) {
                availableIndexes = songsData
                    .map((_, index) => index)
                    .filter(index => index !== currentIndex);
                setShuffleHistory([]);
            }
            
            const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
            setShuffleHistory(prev => [...prev.slice(-Math.floor(songsData.length / 2)), currentIndex]);
            
            await setTrack(songsData[randomIndex]);
            await audioRef.current.play();
            setPlayStatus(true);
        } else {
            const currentIndex = songsData.findIndex(item => item._id === track._id);
            if (currentIndex < songsData.length - 1) {
                await setTrack(songsData[currentIndex + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            } else if (repeatMode === 'all') {
                // Loop back to first song if repeat all is enabled
                await setTrack(songsData[0]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
    }

    const seekSong = async (e) => {
        // offsetX is the distance from the left of the seek bar to the click position
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    }

    const changeVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        setIsMuted(newVolume == 0);
        audioRef.current.volume = newVolume / 100;
    }

    const toggleMute = () => {
        if (isMuted) {
            setVolume(previousVolume);
            setIsMuted(false);
            audioRef.current.volume = previousVolume / 100;
        } else {
            setPreviousVolume(volume);
            setVolume(0);
            setIsMuted(true);
            audioRef.current.volume = 0;
        }
    }

    const toggleShuffle = () => {
        setShuffle(!shuffle);
    }

    const toggleRepeat = () => {
        const modes = ['off', 'all', 'track'];
        const currentIndex = modes.indexOf(repeatMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setRepeatMode(modes[nextIndex]);
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);

        } catch (error) {
            
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/album/list`);
            
            setAlbumsData(response.data.albums);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = () => {
                    // how much time has passed since the song started playing
                    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))+"%"

                    setTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60)
                        }
                    })
                }

                // Handle song end
                audioRef.current.onended = () => {
                    if (repeatMode === 'track') {
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                        setPlayStatus(true);
                    } else {
                        next();
                    }
                }
            }
        }, 1000)
    }, [audioRef, repeatMode])

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, [])

    // Set initial volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [audioRef, volume])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData,
        albumsData,
        volume, setVolume, changeVolume, toggleMute, isMuted,
        repeatMode, toggleRepeat,
        shuffle, toggleShuffle, shuffleHistory
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;