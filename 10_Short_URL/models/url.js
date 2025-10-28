const mongoose = require("mongoose");


const URL_schema = new mongoose.Schema({
    short_Id :{
        type : String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory : [{timeStamp: Number}],
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    Visiblity :{
        type : Boolean,
        required : true,
        default : true,
    }
    },{timestamps: true}
)

const URL = mongoose.model("url",URL_schema);
module.exports = URL;
