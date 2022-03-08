const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

app.get("/api", (req, res) => {
  fetch('words.csv');
  // res.json({"users": ["userOne", "userTwo", "userThree"]});
})

app.listen(5000, () => { console.log("Server started on port 5000") });