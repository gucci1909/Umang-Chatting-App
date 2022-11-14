const mongoose = require("mongoose");

chattingSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    message:String,
    photoURL :String,
    displayName : String,
    uid : String
})

module.exports = mongoose.model('chattingapps', chattingSchema)