const mongoose = require('mongoose')
const tripsModel = require('./model/TripsSchema')
const stateSchema = require('./model/stateSchema')
const busSchema = require('./model/busSchema')
// const data = require('./data1')
const { stateData, tripsData, busData } = require("./data");

// Connect to DATABASE
const url = "mongodb+srv://priyasingh:Priya@cluster0.kepu1bm.mongodb.net/reserve?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

const refreshAll = async () => {
    
    // console.log(connection)
    await tripsModel.insertMany(tripsData)
    await stateSchema.insertMany(stateData)
    await busSchema.insertMany(busData)
    await mongoose.disconnect();

}
refreshAll()