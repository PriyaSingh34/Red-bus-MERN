const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  from: { type: String, required: true },
  to: { type: String, required: true },
  busOwnerID: { type: String, default: "" },
  startTime: { type: String, required: true },
  EndTime: { type: String, required: true },
  category: { type: String, required: true },
  SeatBooked: [],
  bus_no: { type: String,},
  animeties_list: [String],
  busFare: { type: Number, required: true },
  busName: { type: String, required: true },
});

//trips is the collection name here
module.exports = mongoose.model("trips", tripsSchema);
