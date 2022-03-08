const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

var sample;

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

app.get('/api/sample', (req, res) => {
  const sample = 'art,de,en\r\ndie,Sonne,sun\r\nder,Junge,boy\r\ndas,Gebäude,building'
  res.json(csvToJson(sample));
})

app.get('/api/articles', (req, res) => {
  try {
    var csv_file = fs.readFileSync(path.join(__dirname, '/words.csv'), 'utf8');
  } catch (err) {
    console.error('ERR', err);
    return;
  }
  res.json(csvToJson(csv_file));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server started on port ${port}`);