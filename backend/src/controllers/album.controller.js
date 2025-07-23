import {v2 as cloudinary} from 'cloudinary';
import albumModel from '../models/album.model.js';

const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});

        const albumData = {
            name,
            desc,
            image: imageUpload.secure_url,
            bgColor
        }
        
        const album = albumModel(albumData);
        await album.save();
        
        res.json({success:true, message:"Album added"})
    } catch (error) {
        res.json({success:false, message:error})
    }
}

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.json({success:true, albums:allAlbums})
    } catch (error) {
        res.json({success:false, message:error})
    }
}


const removeAlbum = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Album ID is required" });
    }

    try {
        const deletedAlbum = await albumModel.findByIdAndDelete(id);
        
        if (!deletedAlbum) {
            return res.status(404).json({ success: false, message: "Album not found" });
        }

        res.status(200).json({ success: true, message: "Album removed successfully" });
    } catch (error) {
        console.error("Error removing album:", error);
        res.status(500).json({ success: false, message: "Failed to remove album", error: error.message });
    }
};

export {addAlbum, listAlbum, removeAlbum};