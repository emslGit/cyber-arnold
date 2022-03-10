const express = require('express');
const path = require('path');
const app = express();
const csvStr = require('./words.js')['csv_str'];
const assert = require('assert');
const bodyParser = require('body-parser');
// const mongo = require('mongodb');
// const url = 'mongodb://localhost:'

var stats = {};

const sample ='art,de,en\r\ndie,Sonne,sun\r\nder,Junge,boy\r\ndas,Gebäude,building\r\nder,Staat,country\r\ndie,Straße,street';

const csvToJson = (csv) => {
  const lines = csv.split('\r\n');
  const keys = lines[0].split(',');
  return lines.slice(1).map(line => {
    return line.split(',').reduce((acc, cur, i) => {
      const toAdd = {};
      toAdd[keys[i]] = cur;
      return { ...acc, ...toAdd };
    }, {});
  })
}

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/api/stats', (req, res) => {
  stats = req.body;
  res.json(req.body);
})

app.get('/api/stats', (req, res) => {
})

app.get('/api/articles', (req, res) => {
  var json = csvToJson(csvStr);
  const correctTreshold = 1;

  if (stats?.wordStats) {
    excludeWords = Object.entries(stats.wordStats).filter(entry => entry[1] >= correctTreshold).map(entry => entry[0]);
    json = json.filter(word => {
      return !excludeWords.includes(word.de);
    });
  }
  
  res.json(json);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server started on port ${port}`);