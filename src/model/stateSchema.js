
const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema({
    
    "state":{ type: String, required: true },
    "districts":[ ],
});

//trips is the collection name here
module.exports = mongoose.model("state_district", tripsSchema);