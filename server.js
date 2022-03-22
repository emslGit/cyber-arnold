const express = require('express');
const path = require('path');
const app = express();
const { Pool } = require('pg');

let stats = {};

let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/client/build')));

/* POSTGRESQL */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* API REQUESTS */
app.delete('/api/stats', async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('TRUNCATE TABLE stats');
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.post('/api/stats', async (req, res) => {

  let queryStr = "";
  const _stats = Object.entries(req.body.wordStats || {});

  if (_stats.length) {
    _stats.forEach(([k, v]) => {
      stats[k] = stats[k] || v;
    });

    Object.entries(stats).forEach(([k, v]) => {
      queryStr += `('${k}', ${v}),`;
    });

    queryStr = 'TRUNCATE TABLE stats; INSERT INTO stats VALUES ' + queryStr.replace(/.$/, "") + ';';

    try {
      const client = await pool.connect();
      await client.query(queryStr);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }
})

app.get('/api/stats', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM stats');
    let json = result.rows;

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
    const result = await client.query('SELECT * FROM sample');
    let json = result.rows;

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
console.log(process.env.DATABASE_URL);