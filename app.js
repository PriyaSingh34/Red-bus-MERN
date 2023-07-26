const express = require("express");
const app = express();
const tripsModel = require("./src/model/TripsSchema");
const addBookingDetails = require("./src/model/addBookingDetails")
const path = require("path");

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("<html><body><h1>WELCOME TO RED BUS</h1></body></html>");
});




app.post("/addBookingDetails", (req, res) => {
  const { BusID, Name, Gender, Age, Email, MobileNo, FromDate, Seats } =
    req.body;
  const addUser = new addBookingDetails({
    BusID,
    Name,
    Gender,
    Age,
    Email,
    MobileNo,
    FromDate,
    Seats,
    
  });
  addUser.save().then((data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
});

app.get("/fetchBookingDetails", async(req, res) => {
  // const { BusID, FromDate } = req.query;
  addBookingDetails.find({})
    .then((data, err) => {
      if (!err) {
        res.json(data);
        res.end();
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send(err);
    });
});

// Displays an array of all trips from the database//////////////////////
app.get("/tripdetails", async (req, res) => {
  //To retrieve records from a database collection we make use of the .find() function.
  tripsModel.find({})
  .then((data, err) => {
    if (!err) {
      res.json(data);
      res.end();
    }
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send(err);
  });
});


// Add new subscriber using postman ir insomnia
app.post("/tripdetails/add", async (req, res) => {
  const {date, from, to, busOwnerID, startTime, EndTime, category,
  SeatBooked, bus_no, animeties_list, busFare, busName } = req.body;
  //creating a new subscriber as  subscribel model is defined in model
  const trip = new tripsModel({
    
    date,
    from,
    to,
    busOwnerID,
    startTime,
    EndTime,
    category,
    SeatBooked,
    bus_no,
    animeties_list,
    busFare,
    busName,
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
