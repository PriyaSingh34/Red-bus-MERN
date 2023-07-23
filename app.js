const { MongoClient } = require("mongodb");
const { stateData, tripsData, busData } = require("./data");

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
