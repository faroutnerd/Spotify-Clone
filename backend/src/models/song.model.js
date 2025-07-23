import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },     // Name of the song
    desc: { type: String, required: true },     // Description of the song
    album: { type: String, required: true },    // Album name
    image: { type: String, required: true },    // URL of the song image
    file: { type: String, required: true },     // URL of the song file
    duration: { type: String, required: true }, // Duration of the song
});

const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;