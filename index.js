const sqlite3 = require('sqlite3').verbose();

// Open a connection to the SQLite database
const db = new sqlite3.Database('test_database.db');

// Define the table name and column name
const tableName = 'test_table';
const columnName = 'value';

// Data to be inserted
const data = `'test'); DELETE FROM ${tableName}; --`;


// INSECURE QUERY

// Create the table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnName} TEXT)`, function (err) {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');
  
      // Insert data into the table
      db.exec(`INSERT INTO ${tableName} (${columnName}) VALUES (${data})`, function (err) {
        if (err) {
          console.error('Error inserting data:', err.message);
        } else {
          console.log(`Data inserted successfully. Row ID: ${this.lastID}`);
        }
  
        // Close the database connection
        db.close();
      });
    }
  });

// SECURE QUERY

// Create the table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnName} TEXT)`, function (err) {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');
  
      // Insert data into the table
      db.run(`INSERT INTO ${tableName} (${columnName}) VALUES (?)`, [data], function (err) {
        if (err) {
          console.error('Error inserting data:', err.message);
        } else {
          console.log(`Data inserted successfully. Row ID: ${this.lastID}`);
        }

        // The ? is placeholder, then it put data into 2nd argument into an array, then it pass the data into values as a string, not as code
        // This is how parameterization is done to sanitize your data
        
        // Close the database connection
        db.close();
      });
    }
  });
