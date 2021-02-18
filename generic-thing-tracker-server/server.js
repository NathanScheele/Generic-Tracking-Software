// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa");
const mongoose = require('mongoose');

const Thing = require('./database/Models/ThingModel');

require("dotenv").config();

const app = express();
const port = 8000;

mongoose.connect(process.env.MONGODB_URI, 
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => console.log('DB Connected!')
).catch(err => {console.log(`DB Connection Error: ${err.message}`);});

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const authConfig = {
  domain: "nathanscheele.us.auth0.com",
  audience: "https://generic-thing-tracker-api.com"
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

// Secured routes
// app.get('/things', checkJwt, (req, res) => {
//   res.send("TODO");
// });

app.get('/things/add', (req, res) => {
  const testThing = new Thing({
      name: 'Testing Thing',
      desc: 'This is a test of adding a new Thing to the database.',
      authorId: new mongoose.Types.ObjectId(),
      likes: 0
    });
  
  testThing.save(function (err, testThing) {
    if (err){
      console.error(err);
      res.send(err);
    }
    console.log("added testThing successfully.");
    res.send("added testThing successfully.");
  });
});

// app.get('/things/:id', checkJwt, (req, res) => {
//   const id = Number(req.params.id);
//   //const thing = things.find(thing => thing.id === id);
//   res.send("TODO");
// });

// listen on the port
app.listen(port);
console.log(`Server is listening on port ${port}`);