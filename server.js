const express = require('express');
const path = require('path');
const app = express();
const { Pool } = require('pg');

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
    const result = await client.query('TRUNCATE TABLE stats;');

    res.send("Success");
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.post('/api/stats', async (req, res) => {
  let word = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(`INSERT INTO stats (noun) VALUES ('${word.de}');`);

    res.send("Success");
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/api/stats', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM stats');

    res.send(result.rows.map(o => o.noun));
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/api/articles', async (req, res) => {
  try {
    const client = await pool.connect();
    const resultArticles = await client.query('SELECT * FROM nouns');
    const resultStats = await client.query('SELECT * FROM stats');

    const resultStatsList = resultStats.rows.map(o => o.noun) || [];
    let json = resultArticles.rows.filter(o => !resultStatsList.includes(o.de));

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