var app = require('express')();

const identity = require('./organs/identity');
const jobs = require('./organs/jobs');

const organs = {
    identity,
    jobs
}

app.get('/identity', (req, res) => {
  identity
    .get(req.params)
    .then(result => res.json(result))
})

app.post('/identity', (req, res) => {
  identity
    .post(req.params)
    .then(result => res.json(result))
})

app.get('/jobs', (req, res) => {
  jobs
    .get(req.params)
    .then(result => res.json(result))
})

app.post('/jobs', (req, res) => {
  jobs
    .post(req.params)
    .then(result => res.json(result))
})

app.listen(3000, () => {
  console.log('listening on *:3000');
});