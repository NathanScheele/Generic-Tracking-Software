const mongoose = require("mongoose");


const thingSchema = new mongoose.Schema({
    name: String,
    desc: String,
    authorId: mongoose.Types.ObjectId,
    dateCreated: {type: Date, default: Date.now},
    lastUpdate: {type: Date, default: Date.now},
    isPublic: {type: Boolean, default: false},
    likes: Number
});

module.exports = thingSchema;