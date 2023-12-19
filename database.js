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

    await client.query(`
    CREATE TABLE IF NOT EXISTS participants (
        participant_id VARCHAR(255) PRIMARY KEY,
        
        firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    gender varchar(10) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER CHECK (age BETWEEN 18 AND 65),
    batch_id VARCHAR(255) NOT NULL
    
        
      );
      
    `);
    await client.query(`
    CREATE TABLE IF NOT EXISTS batches (
        batch_table_id VARCHAR(255) PRIMARY KEY,
        participant_id VARCHAR(255) REFERENCES participants(participant_id),
        batch_id VARCHAR(10) NOT NULL,
        date_of_change VARCHAR (10),
        CONSTRAINT fk_participant
          FOREIGN KEY (participant_id)
          REFERENCES participants(participant_id)
        
      );

    `);
    await client.query(`
    CREATE TABLE IF NOT EXISTS payment (
      payment_id VARCHAR(255) PRIMARY KEY,
      participant_id VARCHAR(255) REFERENCES participants(participant_id),
      date_of_joining VARCHAR(255) NOT NULL,
      payment_date VARCHAR(255) ,
      CONSTRAINT fk_participant
          FOREIGN KEY (participant_id)
          REFERENCES participants(participant_id)
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
