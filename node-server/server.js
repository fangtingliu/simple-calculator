import _ from 'lodash';
import express from 'express';
import * as parse from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// parse payload and cookies
app.use(parse.urlencoded({extended: true}));
app.use(parse.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());

app.use(express.static('../ember/dist'));

// Temporary db for simplicity, use appropriated db if necessary.
const sessions = {};

app.get('/api/histories', function(req, res) {
  const session = _.get(req, 'cookies.session');

  if (!session) {
    // generate uniq session with capacity 1000, should resize half full for performance
    let id = 1;
    while (sessions[id]) {
      id = Math.ceil(Math.random * 1000);
    }
    const newSession = '12341234' + id;

    res.cookie('session',newSession, { maxAge: 900000, httpOnly: true });

    sessions[`session${id}`] = newSession;
    res.send({data: []});
  } else {
    res.send({data: sessions[req.cookies.session] || []});
  }
})

app.post('/api/histories', function(req, res) {
  const session = req.cookies.session;

  let newCal;
  if (sessions[session]) {
    newCal = _.merge(req.body.data, {id: sessions[session].slice(-1)[0].id + 1});
    sessions[session].push(newCal);
  } else {
    newCal = _.merge(req.body.data, {id: 1});
    sessions[session] = [newCal];
  }

  res.send({data: newCal});
})

let port = 8000;

const server = app.listen(port, function() {
  const host = server.address().address;
  console.log('listening at http://%s:%s', host, port);
});