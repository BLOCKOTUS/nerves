const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { logger } = require('@tinyhttp/logger');

const user = require('../organs/user/fabric/user/javascript');
const identity = require('../organs/identity/fabric/identity/javascript');
const job = require('../organs/job/fabric/job/javascript');

app
  .use(logger())

  .use(bodyParser.urlencoded({ extended: false }))

  .use(bodyParser.json())

  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })


  // create and register a new user
  .post('/user', (req, res) => {
    console.log(req.body)
    user
      .create(req.body)
      .then(result => res.json({
        ...result,
        success: true,
        message: 'Successfully registered username.'
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message
        })
      });
  })

// // get my identity
// app.get('/identity', (req, res) => {
//   identity
//     .getVerificators()
//     .then(result => res.json(result))
//     .catch(res.status(400));
// })

// // create my identity
// app.post('/identity', (req, res) => {
//   identity
//     .create(req.params)
//     .then(result => res.json(result))
//     .catch(res.status(400));
// })

// // get my job list
// app.get('/job', (req, res) => {
//   job
//     .get(req.params)
//     .then(result => res.json(result))
//     .catch(res.status(400));
// })

// // post a job
// app.post('/job', (req, res) => {
//   job
//     .post(req.params)
//     .then(result => res.json(result))
//     .catch(res.status(400));
// })

  .listen(3000, () => {
    console.log('listening on *:3000');
  });