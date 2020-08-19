var app = require('express')();

const identity = require('./organs/identity');
const jobs = require('./organs/jobs');
const user = require('./organs/user');

const organs = {
    identity,
    jobs
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

app.get('/jobs', (req, res) => {
  jobs
    .get(req.params)
    .then(result => res.json(result))
    .catch(res.status(400));
})

app.post('/jobs', (req, res) => {
  jobs
    .post(req.params)
    .then(result => res.json(result))
    .catch(res.status(400));
})

app.listen(3000, () => {
  console.log('listening on *:3000');
});