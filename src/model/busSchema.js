
const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
   "name": { type: String, required: true },
   "category": { type: String },
   "totalSeats": { type: Number, required: true },
   "totalWindowSeatsAvailable": { type: Number},
   "rating": { type: Number, required: true },
   "animeties": []
});

//trips is the collection name here
module.exports = mongoose.model("bus_owner", stateSchema);
