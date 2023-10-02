const client = require("../client");
const util = require("../util");

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
      rows: [sneaks_data],
    } = await client.query(
      `
					  SELECT *
					  FROM sneaks_data
					  WHERE sneaks_data_id =${sneaks_data_id};
				  `
    );
    return sneaks_data;
  } catch (error) {
    throw error;
  }
}

// create new sneaks_data
async function createSneaks_dataData({
  national_num,
  pokename,
  poketype1,
  poketype2,
  pokespecies,
  height,
  weight,
  sign_ability,
}) {
  try {
    const {
      rows: [sneaks_data],
    } = await client.query(
      `
        INSERT INTO sneaks_data(national_num, pokename, poketype1, poketype2, pokespecies, height, weight, sign_ability)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,
      [
        national_num,
        pokename,
        poketype1,
        poketype2 ? poketype2 : "N/A",
        pokespecies,
        height,
        weight,
        sign_ability,
      ]
    );
    return sneaks_data;
  } catch (error) {
    throw error;
  }
}

// add new sneaks_data
async function createSneaks_data({
  national_num,
  pokename,
  poketype1,
  poketype2,
  pokespecies,
  height,
  weight,
  sign_ability,
}) {
  try {
    const {
      rows: [sneaks_data],
    } = await client.query(
      `
        INSERT INTO sneaks_data(national_num, pokename, poketype1, poketype2, pokespecies, height, weight, sign_ability)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,
      [
        national_num,
        pokename,
        poketype1,
        poketype2 ? poketype2 : "N/A",
        pokespecies,
        height,
        weight,
        sign_ability,
      ]
    );
    return sneaks_data;
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
      rows: [sneaks_data],
    } = await client.query(
      `
        UPDATE sneaks_data
        SET ${setString}
        WHERE id=${sneaks_data_id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return sneaks_data;
  } catch (error) {
    throw error;
  }
}

// delete sneaks_data by id
async function deleteSneaks_dataById(sneaks_data_id) {
  try {
    const {
      rows: [sneaks_data],
    } = await client.query(`
        DELETE FROM sneaks_data
        WHERE sneaks_data_id =${sneaks_data_id};
        RETURNING *;
        `);
    return sneaks_data;
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
    return rows;
  } catch (error) {
    throw error;
  }
}

// export functions
module.exports = {
  getAllSneaks_data,
  getSneaks_dataById,
  createSneaks_data,
  createSneaks_dataData,
  updateSneaks_dataById,
  deleteSneaks_dataById,
  deleteAllSneaks_data,
};
