'use strict';

var express = require('express');
var app = express()
var importProcess = require('./import.js');

app.route('/')
  .get(function (req, res) {
    res.send('not implemented yet')
  })
  .post(function (req, res) {
    res.send('not implemented yet')
  })
  .put(function (req, res) {
    res.send('not implemented yet')
  })
  .delete(function (req, res) {
    res.send('not implemented yet')
  })

app.post('/import', (req, res) => importProcess.import(req, res))

app.post('/test', (req, res) => importProcess.test(req, res))

app.listen(3000);
console.log(`Express server listening on port ${3000}`);
