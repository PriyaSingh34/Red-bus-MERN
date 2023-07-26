const express = require("express");
const app = express();
const tripsModel = require("./src/model/TripsSchema");
const path = require("path");

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("<html><body><h1>WELCOME TO RED BUS</h1></body></html>");
});

// Displays an array of all subscribers from the database
app.get("/tripdetails", async (request, response) => {
  //To retrieve records from a database collection we make use of the .find() function.
  const busCategory = await tripsModel.find({});
  try {
    //Since no parameters have been provided, it will return all of the items in the database.
    response.send(busCategory);
  } catch (error) {
    //send error if route not found
    response.status(404).send(error);
  }
});

// Add new subscriber using postman ir insomnia
app.post("/tripdetails/add", async (req, res) => {
  //creating a new subscriber as  subscribel model is defined in model
  const trip = new tripsModel({
    busName: req.body.busName,
    busFare: req.body.busFare,
    date: req.body.date,
    date: req.body.date,
    from: req.body.from,
    to: req.body.to,
    busOwnerID: req.body.busOwnerID,
    startTime: req.body.startTime,
    EndTime: req.body.EndTime,
    category: req.body.category,
    SeatBooked: req.body.SeatBooked,
    bus_no: req.body.bus_no,
    animeties_list: req.body.animeties_list,
    busFare: req.body.busFare,
    busName: req.body.busName,
  });
  try {
    // use .save() to save it to the database.
    const newtrip = await trip.save();
    //response send to the database
    res.status(201).json({ newtrip });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
