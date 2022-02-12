const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'Cookie',
    'Set-Cookie'
  ],
  credentials: true,
  methods: ['GET']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', routes);

app.listen(8081, () => {
  console.log('http://localhost:8080/api');
});
