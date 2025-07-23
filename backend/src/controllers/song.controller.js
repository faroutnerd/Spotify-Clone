import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/song.model.js';

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFIle = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type:"video"});
        const imageUpload = await cloudinary.uploader.upload(imageFIle.path, {resource_type:"image"});
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();
        
        res.json({success:true, message:"Song added"})
    } catch (error) {
        res.json({success:false, message:error})
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({success:true, songs:allSongs})
    } catch (error) {
        res.json({success:false, message:error})
    }
}

const removeSong = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Song ID is required" });
    }

    try {
        const deletedSong = await songModel.findByIdAndDelete(id);

        if (!deletedSong) {
            return res.status(404).json({ success: false, message: "Song not found" });
        }

        res.status(200).json({ success: true, message: "Song removed successfully" });
    } catch (error) {
        console.error("Error removing song:", error);
        res.status(500).json({ success: false, message: "Failed to remove song", error: error.message });
    }
};

export { addSong, listSong, removeSong };