import { useContext, useEffect, useRef } from "react";
import DisplayHome from "./DisplayHome";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef(); // using for album background color
  const location = useLocation(); // to get the current location
  const isAlbum = location.pathname.includes("album"); // check if the current location is album
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId)?.bgColor
      : "#121212";
  

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [isAlbum, bgColor]);
  
  return (
    <div
      ref={displayRef}
      className={`w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[80%] lg:ml-0`}
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id === albumId)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;
