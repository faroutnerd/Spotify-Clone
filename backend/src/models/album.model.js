import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },     // Name of the album
    desc: { type: String, required: true },     // Description of the album
    bgColor: { type: String, required: true }, // Background color of the album
    image: { type: String, required: true },    // URL of the album image
});

const albumModel = mongoose.models.album || mongoose.model("album", albumSchema);

export default albumModel;