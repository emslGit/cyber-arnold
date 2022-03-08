const express = require('express');
const app = express();

const path = require('path');
const port = process.env.PORT || 5000;

const csv_file = require("fs").readFileSync("words.csv", "utf8")

if (process.env.NODE_DEV === "production") {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}

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

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started on port: ", port)
});