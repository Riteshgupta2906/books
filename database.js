// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

// pool.connect((err) => {
//   if (err) throw err;
//   console.log("Connect to PostgreSQL successfully!");
// });

// module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect(async (err, client, release) => {
  if (err) throw err;

  try {
    // Create 'participants' table if not exists
    // await client.query(`
    // CREATE TABLE IF NOT EXISTS batches (
    //     batch_id SERIAL PRIMARY KEY,
    //     start_time TIME NOT NULL,
    //     end_time TIME NOT NULL
    //   );

    // `);
    // await client.query(`
    // CREATE TABLE IF NOT EXISTS payments (
    //     payment_id SERIAL PRIMARY KEY,
    //     pay_date DATE NOT NULL,
    //     pay_status BOOLEAN DEFAULT false
    //   );

    // `);
    await client.query(`
    CREATE TABLE IF NOT EXISTS participants (
        participant_id VARCHAR(255) PRIMARY KEY,
        
        firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER CHECK (age BETWEEN 18 AND 65),
    batch_id VARCHAR(255) NOT NULL,
    payment_date VARCHAR(255)
        
      );
      
    `);

    // Create 'batches' table if not exists

    console.log("Connected to PostgreSQL successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    release(); // Release the client back to the pool
  }
});

module.exports = pool;
