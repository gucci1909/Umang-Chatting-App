const mongoose = require("mongoose");

chattingSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    message:String,
    photoURL :String
})

module.exports = mongoose.model('chattingapps', chattingSchema)