import express from 'express';
import bodyParser from 'body-parser';
import { logger } from '@tinyhttp/logger';

import did from '../organs/did/api/dist/index.js';
import identity from '../organs/identity/api/dist/index.js';
import job from '../organs/job/api/dist/index.js';
import keypair from '../organs/keypair/api/dist/index.js';
import user from '../organs/user/api/dist/index.js';

const PORT = process.env.NERVES_PORT || 3000;

const app = express();

app
  .use(logger())

  .use(bodyParser.urlencoded({ extended: false }))

  .use(bodyParser.json())

  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  })

  .use((req, res, next) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const splitted = Buffer.from(b64auth, 'base64').toString().split(':');
    const username = splitted[0];
    splitted.shift();
    const rawWallet = splitted.join(':');
    try {
      const wallet = JSON.parse(rawWallet);
      req.method === 'GET' ? req.query.user = { username, wallet } : req.body.user = { username, wallet };
    } catch (e) { null; }

    next();
  })

  // create and register a new user
  .post('/user', (req, res) => {
    user
      .create(req.body)
      .then(result => res.json({
        ...result,
        success: true,
        message: 'Successfully registered username.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // get user
  .get('/user', (req, res) => {
    user
      .get(req.query)
      .then(result => res.json({
        data: result,
        success: true,
        message: 'Successfully got user.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // create a keypair
  .post('/keypair', (req, res) => {
    keypair
      .share(req.body)
      .then(result => res.json({
        ...result,
        success: true,
        message: 'Successfully created shared keypair.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // get a keypair
  .get('/keypair', (req, res) => {
    keypair
      .get(req.query)
      .then(result => res.json({
        keypair: result,
        success: true,
        message: 'Successfully got keypair.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // create and register a new identity
  .post('/identity', (req, res) => {
    identity
      .create(req.body)
      .then(result => res.json({
        ...result,
        success: true,
        message: 'Successfully created identity.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // get identity
  .get('/identity', (req, res) => {
    identity
      .get(req.query)
      .then(result => res.json({
        identity: result,
        success: true,
        message: 'Successfully got identity.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // create a new job
  .post('/job', (req, res) => {
    job
      .create(req.body)
      .then(result => res.json({
        ...result,
        success: true,
        message: 'Successfully created job.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // list jobs
  .get('/job/list', (req, res) => {
    job
      .list(req.query)
      .then(result => res.json({
        list: result,
        success: true,
        message: 'Successfully listed jobs.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // get job details
  .get('/job', (req, res) => {
    job
      .get(req.query)
      .then(result => res.json({
        job: result,
        success: true,
        message: 'Successfully got the details of the job.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // complete a job
  .post('/job/complete', (req, res) => {
    job
      .complete(req.body)
      .then(() => res.json({
        success: true,
        message: 'Successfully completed the job.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  // request by DID url
  .get('/did', (req, res) => {
    did
      .request(req.query)
      .then(result => res.json({
        data: result,
        success: true,
        message: 'Successfully requested by DID url.',
      }))
      .catch(e => {
        res.json({
          success: false,
          message: e.message,
        });
      });
  })

  .listen(PORT, () => {
    console.log(`Nerves listening on PORT: ${PORT}`);
  });
