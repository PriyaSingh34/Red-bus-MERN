const { MongoClient } = require("mongodb");
const express = require('express');
const app = express();
const { stateData, tripsData, busData } = require("./src/data");

// MongoDB Atlas connection string
const uri =
  "mongodb+srv://priyasingh:Priya@cluster0.kepu1bm.mongodb.net/reserve?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function insertDataToMongoDB() {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();
    console.log("Connected correctly to server");

    // Access the "reserve" database and "state_district" collection
    const db = client.db("reserve");
    const collection = db.collection("state_district");

    app.get("/state", async (request, response) => {
        //To retrieve records from a database collection we make use of the .find() function.
        const getState = await collection.find({});
        try {
          //Since no parameters have been provided, it will return all of the items in the database.
          response.send(getState);
        } catch (error) {
          //send error if route not found
          response.status(404).send(error);
        }
      });

    

    
    
    // Insert the data into the collection
    const result = await db.collection("state_district").insertMany(stateData);
    console.log(`${result.insertedCount} documents inserted.`);

    const result2 = await db.collection("trips").insertMany(tripsData);
    console.log(`${result2.insertedCount} documents inserted.`);

    const result3 = await db.collection("bus_owner").insertMany(busData);
    console.log(`${result3.insertedCount} documents inserted.`);
    // Close the connection to MongoDB Atlas
    client.close();
  } catch (err) {
    console.error("Error occurred:", err);
  }
}

// Call the function to insert data into MongoDB Atlas
insertDataToMongoDB();
