const client = require("../client");
const util = require("./util");

async function getAllCostumes_data() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM costumes_data;
        `);
    console.log("getAllCostumes_data rows: ", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

// get costumes_data by id
async function getCostumes_dataById(costumes_data_id) {
  try {
    const {
      rows: [costume],
    } = await client.query(`
		SELECT *
	  FROM costumes_data
	  WHERE costumes_data_id =${costumes_data_id};
				  `);
    return costume;
  } catch (error) {
    throw error;
  }
}

// create new costumes_data
async function createCostumes_data({
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
      rows: [costume],
    } = await client.query(
      `
        INSERT INTO costumes_data(asin, product_title, product_original_price, product_star_rating, product_num_ratings, product_url, product_photo, product_num_offers, product_minimum_offer_price, is_best_seller, is_prime, climate_pledge_friendly) 
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
    return costume;
  } catch (error) {
    throw error;
  }
}

// update costumes_data by id
async function updateCostumes_dataById(costumes_data_id, fields = {}) {
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
      rows: [costume],
    } = await client.query(
      `
        UPDATE costumes_data
        SET ${setString}
        WHERE id=${costumes_data_id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return costume;
  } catch (error) {
    throw error;
  }
}

// delete costumes_data by id
async function deleteCostumes_dataById(costumes_data_id) {
  try {
    const {
      rows: [costume],
    } = await client.query(`
        DELETE FROM costumes_data
        WHERE costumes_data_id =${costumes_data_id};
        RETURNING *;
        `);
    return costume;
  } catch (error) {
    throw error;
  }
}

// delete all costumes_data
async function deleteAllCostumes_data() {
  try {
    const { rows } = await client.query(`
        DELETE FROM costumes_data;
        `);
    return costumes_data;
  } catch (error) {
    throw error;
  }
}

// export functions
module.exports = {
  getAllCostumes_data,
  getCostumes_dataById,
  createCostumes_data,
  updateCostumes_dataById,
  deleteCostumes_dataById,
  deleteAllCostumes_data,
};
