const client = require("./client");

const { createSneaks_data } = require("./helpers/sneaks_data");
const { createCustomers } = require("./helpers/customers");
const { createCustomers } = require("./helpers/customers");

const { sneaks_data, customers } = require("./seedData");
const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
		  DROP TABLE IF EXISTS sneaks_data;
		  DROP TABLE IF EXISTS users;
		  DROP TABLE IF EXISTS customers;
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
			sneaks_data_id SERIAL PRIMARY KEY,
			asin VARCHAR(255),
			product_title VARCHAR(255),
			product_original_price VARCHAR(255),
			product_star_rating VARCHAR(255),
			product_num_ratings VARCHAR(255),
			product_url VARCHAR(255),
			product_photo  VARCHAR(255),
			product_num_offers  VARCHAR(255),
			product_minimum_offer_price VARCHAR(255),
			is_best_seller BOOLEAN,
			is_prime BOOLEAN,
			climate_pledge_friendly BOOLEAN
			);
			
			CREATE TABLE customers (
				customer_id SERIAL PRIMARY KEY,
				name varchar(255),
				username varchar(255) UNIQUE,
				password varchar(255),
				fav_brand varchar(255) 
			);`);

    console.log("Tables built!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

const createInitialSneaks_data = async () => {
  try {
    if (!sneaks_data) {
      console.error("sneaks_data is not defined or is null.");
      return;
    }

    const sneaksDataArray = Object.values(sneaks_data); // Convert object to an array of values
    for (const sneak of sneaksDataArray) {
      await createSneaks_data(sneak);
    }
  } catch (error) {
    throw error;
  }
};

const createInitialCustomers = async () => {
  try {
    for (const customer of customers)
      await createCustomers(customer), console.log("created customers");
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
    await createInitialCustomers();
  } catch (error) {
    console.error(error);
  } finally {
    // close our connection
    client.end();
  }
};

rebuildDb();
