import React, { useContext } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />

      <section className="mb-4">
        <h2 className='my-5 font-bold text-2xl'>Featured Charts</h2>
        <div className="flex overflow-auto gap-4 snap-x">
          {albumsData.length > 0 ? (
            albumsData.map((item) => (
              <div className="snap-start" key={item._id}>
                <AlbumItem {...item} id={item._id} />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No featured charts available.</p>
          )}
        </div>
      </section>

      <section className="mb-4">
        <h2 className='my-5 font-bold text-2xl'>Today's biggest hits</h2>
        <div className="flex overflow-auto gap-4 snap-x">
          {songsData.length > 0 ? (
            songsData.map((item) => (
              <div className="snap-start" key={item._id}>
                <SongItem {...item} id={item._id} />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No songs available today.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DisplayHome;
