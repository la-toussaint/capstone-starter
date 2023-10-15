const client = require("./client");
//   DROP TABLE IF EXISTS costumes_data;
//   DROP TABLE IF EXISTS users;
//   DROP TABLE IF EXISTS customers;
//   DROP TABLE IF EXISTS closets;

const { createSneaks_data } = require("./helpers/sneaks_data");
const { createCostumes_data } = require("./helpers/costumes_data");
const { createCustomers } = require("./helpers/customers");
const { createClosets } = require("./helpers/closets");
const {
  sneaks_data,
  costumes_data,
  customers,
  closets,
} = require("./seedData");
const dropTables = async () => {
  try {
    console.log("Starting to drop tables");
    await client.query(`
		DROP TABLE IF EXISTS closetProduct_data CASCADE;
		DROP TABLE IF EXISTS sneaks_data;
		DROP TABLE IF EXISTS costumes_data;  
		DROP TABLE IF EXISTS users;
		DROP TABLE IF EXISTS customers;
		DROP TABLE IF EXISTS closets;
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
			product_num_offers VARCHAR(255),
			product_minimum_offer_price VARCHAR(255),
			is_best_seller BOOLEAN,
			is_prime BOOLEAN,
			climate_pledge_friendly BOOLEAN
			);
			
			CREATE TABLE costumes_data (
				costumes_data_id SERIAL PRIMARY KEY,
				asin VARCHAR(255),
				product_title VARCHAR(255),
				product_original_price VARCHAR(255),
				product_star_rating VARCHAR(255),
				product_num_ratings VARCHAR(255),
				product_url VARCHAR(255),
				product_photo  VARCHAR(255),
				product_num_offers VARCHAR(255),
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
			);
			
			CREATE TABLE closets (
				closet_id SERIAL PRIMARY KEY,
				name varchar(1024),
				creator_id varchar(1024),
				isTemplate BOOLEAN, 
				background varchar (1024),
				product_type varchar(1024)
				);
				
		
				CREATE TABLE closetProduct_data (
					closetProduct_data_id SERIAL PRIMARY KEY, 
					closet_id INT REFERENCES closets(closet_id),
					product_data_id INT,
					product_type VARCHAR(255),
					name VARCHAR(255),
					UNIQUE ("closet_id", "product_data_id")
				);
				
				ALTER TABLE closetProduct_data
				ADD CONSTRAINT fk_sneaks_data FOREIGN KEY (product_data_id) REFERENCES sneaks_data(sneaks_data_id);
				

				
				ALTER TABLE closetProduct_data
				ADD CONSTRAINT fk_costumes_data FOREIGN KEY (product_data_id) REFERENCES costumes_data(costumes_data_id);
				
				
				`);

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

const createInitialCostumes_data = async () => {
  try {
    if (!costumes_data) {
      console.error("costumes_data is not defined or is null.");
      return;
    }

    const costumesDataArray = Object.values(costumes_data); // Convert object to an array of values
    for (const costume of costumesDataArray) {
      await createCostumes_data(costume);
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

const createInitialClosets = async () => {
  try {
    for (const closet of closets)
      await createClosets(closet), console.log("created closets");
  } catch (error) {
    throw error;
  }
};

//Call all my functions and 'BUILD' my database

const rebuildDb = async () => {
  try {
    // ACTUALLY connect to my local database
    client.connect();
    await dropTables();
    // Create tables first
    await createTables();

    // Generating starting data
    console.log("starting to seed...");

    // Insert data after tables are created
    await createInitialSneaks_data();
    await createInitialCostumes_data();
    await createInitialCustomers();
    await createInitialClosets();
  } catch (error) {
    console.error(error);
  } finally {
    // close our connection
    client.end();
  }
};

rebuildDb();
