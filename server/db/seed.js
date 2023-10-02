const client = require("./client");

const { createSneaks_data } = require("./helpers/sneaks_data");

const sneaks_data = require("./seedData");
const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
		  DROP TABLE IF EXISTS sneaks_data;
		  
		  `);
    console.log("Tables dropped!");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
};

//Create Tables because we need a place for the data to live
const createTables = async () => {
  console.log("Building tables...");
  try {
    await client.query(`
		  CREATE TABLE sneaks_data (
			  sneaks_id SERIAL PRIMARY KEY,
				 asin INTEGER UNIQUE ,
			  product_title varchar(255),
			  product_original_price CURRENCY AMOUNT,
			  product_star_rating  INTEGER ,
			  product_num_ratings" varchar(255),
			  product_url VARCHAR(255) ,
			  product_photo  VARCHAR(255) ,
			  product_num_offers  NUMERIC::MONEY , 
				product_minimum_offer_price NUMERIC::MONEY 
			  is_best_seller BOOLEAN 
			  is_prime BOOLEAN  
			  climate_pledge_friendly BOOLEAN
			  
			  CREATE TABLE users (
				user_id SERIAL PRIMARY KEY,
				name varchar(255)  , 
				username varchar(255) UNIQUE , 
				password varchar(255) ,
				fav_pokemon varchar(255) 
			);`);

    console.log("Tables built!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

const createInitialSneaks_data = async () => {
  try {
    for (const sneaker of sneaks_data) await createSneaks_data(sneaker);
  } catch (error) {
    throw error;
  }
};

const createInitialUsers = async () => {
  try {
    //Looping through the "trainers" array from seedData
    //Insert each trainer into the table
    for (const user of users)
      await createUsers(user), console.log("created users");
  } catch (error) {
    throw error;
  }
};

//Call all my functions and 'BUILD' my database

const rebuildDb = async () => {
  try {
    // ACTUALLY connect to my local database
    client.connect();
    // Run our functions
    await dropTables();
    await createTables();

    // Generating starting data
    console.log("starting to seed...");
    await createInitialSneaks_data();

    await createInitialUsers();
  } catch (error) {
    console.error(error);
  } finally {
    // close our connection
    client.end();
  }
};

rebuildDb();
