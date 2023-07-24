const express = require('express')
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



  app.get('/', (req, res) => {
    res.send('College Booking Server is running..')
  })
  
  app.listen(port, () => {
    console.log(`College Booking running on port ${port}`)
  })