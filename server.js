const express = require('express');
const path = require('path');
const app = express();
const csv_str = require('./words.js')['csv_str'];

const csvToJson = (csv) => {
  const lines = csv.split('\r\n');
  const keys = lines[0].split(',');
  return lines.slice(1).map(line => {
    return line.split(',').reduce((acc, cur, i) => {
      const toAdd = {};
      toAdd[keys[i]] = cur;
      return { ...acc, ...toAdd };
    }, {});
  });
};

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/api/articles', (req, res) => {
  res.json(csvToJson(csv_str));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server started on port ${port}`);