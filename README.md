## Cyber Arnold

Learn german like Arnold, but in a cyber punk setting!

https://cyber-arnold.herokuapp.com

### Frontend:
- React
- Redux toolkit

### Backend:
- PostgreSQL
- Express
- Nodejs
- Heroku

### Copying to CSV
heroku psql -a cyber-arnold
\copy nouns FROM file.csv WITH (FORMAT CSV, ENCODING 'UTF8');