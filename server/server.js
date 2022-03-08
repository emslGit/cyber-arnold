const express = require('express');
const app = express();
const csv_file = require("fs").readFileSync("words.csv", "utf8")

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

app.get("/api", (req, res) => {
  res.json(csvToJson(csv_file));
})

app.listen(5000, () => { console.log("Server started on port 5000") });