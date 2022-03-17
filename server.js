const express = require('express');
const path = require('path');
const app = express();
const { Pool } = require('pg');

var stats = {};

app.use(express.static(path.join(__dirname, '/client/build')));

/* POSTGRESQL */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* API REQUESTS */
app.post('/api/stats', async (req, res) => {
  // var queryStr = "INSERT INTO stats VALUES "
  
  // Object.entries(stats).forEach(([k, v]) => {
  //   str += `(${k}, ${v}),`;
  // });
  
  // str = str.replace(/.$/,"");

  // try {
  //   const client = await pool.connect();
  //   await client.query(queryStr);
  //   client.release();
  // } catch (err) {
  //   console.error(err); 
  //   res.send("Error " + err);
  // }

  stats = req.body;
  res.json(req.body);
})

app.get('/api/stats', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM stats');
    var json = result.rows;

    res.json(json);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/api/articles', async (req, res) => {
  const correctTreshold = 1;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM nouns');
    var json = result.rows;

    if (stats?.wordStats) {
      excludeWords = Object.entries(stats.wordStats).filter(entry => entry[1] >= correctTreshold).map(entry => entry[0]);
      json = json.filter(word => {
        return !excludeWords.includes(word.de);
      });
    }

    res.json(json);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

/* STARTUP */
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server started on port ${port}`);