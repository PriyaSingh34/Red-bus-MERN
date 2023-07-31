const express = require("express");
const app = express();
const tripsModel = require("./src/model/TripsSchema");
const addBookingDetails = require("./src/model/addBookingDetails")


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("<html><body><h1>WELCOME TO RED BUS</h1></body></html>");
});





app.get("/tripdetails", async (req, res) => {
  //To retrieve all the records from a database collection we make use of the .find() function.
  const myData = await tripsModel.find({})
  .then((myData, err) => {
    if (!err) {
      res.json(myData);
      res.end();
    }
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send(err);
  });
});


app.post("/tripdetails/add", async (req, res) => {
  const {date, from, to, busOwnerID, startTime, EndTime, category,
  SeatBooked, bus_no, animeties_list, busFare, busName } = req.body;
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


app.get("/tripdetailsbydate", async (req, res) => {
  //To retrieve records from a database collection we make use of the .find() function.
   const date = req.query;
  const myData = await tripsModel.find(date)
  // console.log(req.query)
  .then((myData, err) => {
    if (!err) {
      res.json(myData);
      res.end();
    }
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send(err);
  });
});

app.get("/tripdetails", async (req, res) => {
  //To retrieve records from a database collection we make use of the .find() function.
   const {date,from,to,busOwnerID,startTime,EndTime,category,SeatBooked,bus_no,animeties_list,busFare,busName} = req.query;
  const queryObject = {};

  if(date){
    queryObject.date=date;
  }

  if(from){
    queryObject.from=from;
  }

  if(to){
    queryObject.to=to;
  }

  if(busOwnerID){
    queryObject.busOwnerID=busOwnerID;
  }

  if(startTime){
    queryObject.startTime=startTime;
  }

  if(EndTime){
    queryObject.EndTime=EndTime;
  }

  if(category){
    queryObject.category=category;
  }

  if(SeatBooked){
    queryObject.SeatBooked=SeatBooked;
  }

  if(bus_no){
    queryObject.bus_no=bus_no;
  }

  if(animeties_list){
    queryObject.animeties_list=animeties_list;
  }

  if(busFare){
    queryObject.busFare=busFare;
  }

  if(busName){
    queryObject.busName=busName;
  }

   const myData = await tripsModel.find(queryObject)
  console.log(queryObject)
  .then((myData, err) => {
    if (!err) {
      res.json(myData);
      res.end();
    }
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send(err);
  });
});

















module.exports = app;
