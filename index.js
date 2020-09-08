const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { logger } = require('@tinyhttp/logger');

const user = require('../organs/user/api');
const identity = require('../organs/identity/api');
const job = require('../organs/job/api');

app
  .use(logger())

  .use(bodyParser.urlencoded({ extended: false }))

  .use(bodyParser.json())

  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  })

  .use((req, res, next) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const splitted = Buffer.from(b64auth, 'base64').toString().split(':');
    const username = splitted[0];
    splitted.shift();
    const rawWallet = splitted.join(':');
    try{
      const wallet = JSON.parse(rawWallet);
      req.method === 'GET' ? req.query.user = { username, wallet } : req.body.user = { username, wallet };
    }catch(e) { console.log(e) }

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

  // create a shared keypair
  .post('/user/keypair', (req, res) => {
    console.log(req.body)
    user
      .shareKeypair(req.body)
      .then(result => res.json({
        ...result,
        success: true,
        message: 'Successfully created shared keypair.'
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message
        })
      });
  })

  // get a keypair
  .get('/user/keypair/get', (req, res) => {
    console.log(req.query)
    user
      .getKeypair(req.query)
      .then(result => res.json({
        keypair: result,
        success: true,
        message: 'Successfully got keypair.'
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message
        })
      });
  })

  // create and register a new identity
  .post('/identity', (req, res) => {
    console.log(req.body)
    identity
      .create(req.body)
      .then(result => res.json({
        ...result,
        success: true,
        message: 'Successfully created identity.'
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message
        })
      });
  })

  // create a new job
  .post('/job', (req, res) => {
    console.log(req.body)
    job
      .create(req.body)
      .then(result => res.json({
        ...result,
        success: true,
        message: 'Successfully created job.'
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message
        })
      });
  })

  // list jobs
  .get('/job/list', (req, res) => {
    console.log(req.query)
    job
      .list(req.query)
      .then(result => res.json({
        list: result,
        success: true,
        message: 'Successfully listed jobs.'
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message
        })
      });
  })

  // get job details
  .get('/job/get', (req, res) => {
    console.log(req.query)
    job
      .get(req.query)
      .then(result => res.json({
        job: result,
        success: true,
        message: 'Successfully got the details of the job.'
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message
        })
      });
  })

   // complete a job
   .post('/job/complete', (req, res) => {
    console.log(req.body)
    job
      .complete(req.body)
      .then(() => res.json({
        success: true,
        message: 'Successfully completed the job.'
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message
        })
      });
  })


  .listen(3000, () => {
    console.log('listening on *:3000');
  });