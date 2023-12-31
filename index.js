const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000

// middleware
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
  app.use(express.json())





  

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vhjeumo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const usersCollection = client.db('collegeBooker').collection('users');
    const collegesCollection = client.db('collegeBooker').collection('colleges');


    //get all users
    app.get("/users", async (req, res) => {
        const result = await usersCollection.find().toArray();
        res.send(result);
      })
      // save user Email and name in DB
      app.post("/users", async (req, res) => {
        const user = req.body;
        const query = { email: user.email }
        const existingUser = await usersCollection.findOne(query)
        if (existingUser) {
          return res.send({ message: "User already exists" })
        }
        const result = await usersCollection.insertOne(user);
        res.send(result);
      });

     //get all colleges
     app.get("/colleges", async (req, res) => {
        const result = await collegesCollection.find().toArray();
        res.send(result);
      })
    // get single colleges
    app.get("/colleges/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collegesCollection.findOne(query);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











  app.get('/', (req, res) => {
    res.send('College Booking Server is running..')
  })
  
  app.listen(port, () => {
    console.log(`College Booking running on port ${port}`)
  })