'use strict';

const express = require('express');
// const bodyParser = require('body-parser')// not requiered any longer;
const morgan = require('morgan');
const { handlerClientsData } = require('./handlers');

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get('/clientsData*', handlerClientsData)

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
1;
