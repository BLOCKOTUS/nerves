var app = require('express')();

const identity = require('./organs/identity');
const job = require('./organs/job');
const user = require('./organs/user');

const organs = {
    identity,
    job
}

// create and register a new user
app.post('/user', (req, res) => {
  user
    .create(req.params)
    .then(result => req.json(result))
    .catch(res.status(400));
})

// get the list of identity verificators
app.get('/identity/verificators', (req, res) => {
  identity
    .getVerificators()
    .then(result => res.json(result))
    .catch(res.status(400));
})


app.post('/identity', (req, res) => {
  identity
    .create(req.params)
    .then(result => res.json(result))
    .catch(res.status(400));
})

app.get('/job', (req, res) => {
  job
    .get(req.params)
    .then(result => res.json(result))
    .catch(res.status(400));
})

app.post('/job', (req, res) => {
  job
    .post(req.params)
    .then(result => res.json(result))
    .catch(res.status(400));
})

app.listen(3000, () => {
  console.log('listening on *:3000');
});