const client = require("../client");
const util = require("./util");

async function getAllSneaks_data() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM sneaks_data;
        `);
    console.log("getAllSneaks_data rows: ", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

// get sneaks_data by id
async function getSneaks_dataById(sneaks_data_id) {
  try {
    const {
      rows: [sneak],
    } = await client.query(`
		SELECT *
	  FROM sneaks_data
	  WHERE sneaks_data_id =${sneaks_data_id};
				  `);
    return sneak;
  } catch (error) {
    throw error;
  }
}

// create new sneaks_data
async function createSneaks_data({
  asin,
  product_title,
  product_original_price,
  product_star_rating,
  product_num_ratings,
  product_url,
  product_photo,
  product_num_offers,
  product_minimum_offer_price,
  is_best_seller,
  is_prime,
  climate_pledge_friendly,
}) {
  try {
    const {
      rows: [sneak],
    } = await client.query(
      `
        INSERT INTO sneaks_data(asin, product_title, product_original_price, product_star_rating, product_num_ratings, product_url, product_photo, product_num_offers, product_minimum_offer_price, is_best_seller, is_prime, climate_pledge_friendly) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *;
        `,
      [
        asin,
        product_title,
        product_original_price,
        product_star_rating,
        product_num_ratings,
        product_url,
        product_photo,
        product_num_offers,
        product_minimum_offer_price,
        is_best_seller,
        is_prime,
        climate_pledge_friendly,
      ]
    );
    return sneak;
  } catch (error) {
    throw error;
  }
}

// update sneaks_data by id
async function updateSneaks_dataById(sneaks_data_id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [sneak],
    } = await client.query(
      `
        UPDATE sneaks_data
        SET ${setString}
        WHERE id=${sneaks_data_id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return sneak;
  } catch (error) {
    throw error;
  }
}

// delete sneaks_data by id
async function deleteSneaks_dataById(sneaks_data_id) {
  try {
    const {
      rows: [sneak],
    } = await client.query(`
        DELETE FROM sneaks_data
        WHERE sneaks_data_id =${sneaks_data_id};
        RETURNING *;
        `);
    return sneak;
  } catch (error) {
    throw error;
  }
}

// delete all sneaks_data
async function deleteAllSneaks_data() {
  try {
    const { rows } = await client.query(`
        DELETE FROM sneaks_data;
        `);
    return sneaks_data;
  } catch (error) {
    throw error;
  }
}

// export functions
module.exports = {
  getAllSneaks_data,
  getSneaks_dataById,
  createSneaks_data,
  updateSneaks_dataById,
  deleteSneaks_dataById,
  deleteAllSneaks_data,
};
