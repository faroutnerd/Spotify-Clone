import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[300px] hidden lg:flex flex-col gap-3 text-white p-2">
      {/* Home + Search Section */}
      <div className="bg-[#121212] rounded p-4 flex flex-col gap-4">
        <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="Home" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="Search" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* Library Section */}
      <div className="bg-[#121212] rounded p-4 flex flex-col gap-4 h-full overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-6" src={assets.stack_icon} alt="Library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-5" src={assets.arrow_icon} alt="Arrow" />
            <img className="w-5" src={assets.plus_icon} alt="Plus" />
          </div>
        </div>

        {/* Playlist Prompt */}
        <div className="bg-[#242424] rounded-lg p-4 flex flex-col gap-2">
          <h1 className="text-sm font-bold">Create your playlist</h1>
          <p className="text-sm text-gray-300">It's easy — we’ll help you</p>
          <button className="px-4 py-1.5 bg-white text-sm text-black rounded-full w-fit mt-2">
            Create Playlist
          </button>
        </div>

        {/* Podcast Prompt */}
        <div className="bg-[#242424] rounded-lg p-4 flex flex-col gap-2">
          <h1 className="text-sm font-bold">Let’s find some podcasts to follow</h1>
          <p className="text-sm text-gray-300">We’ll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-sm text-black rounded-full w-fit mt-2">
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
