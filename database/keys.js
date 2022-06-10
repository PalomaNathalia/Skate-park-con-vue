const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "skatepark",
    port: 5432,
  });


  module.exports = pool;