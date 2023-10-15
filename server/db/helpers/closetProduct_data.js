const client = require("./client");
const util = require("./util");

async function getClosetProduct_dataById(id) {
  try {
    const {
      rows: [closetProduct_data],
    } = await client.query(
      `
      SELECT * FROM closetProduct_data
      WHERE closetProduct_data_id = $1
    `,
      [closetProduct_data_id]
    );
    return closetProduct_data;
  } catch (error) {
    throw error;
  }
}

async function addProduct_dataToCloset({
  closet_id,
  product_data_id,
  name,
  product_type,
}) {
  try {
    const {
      rows: [closetProduct_data],
    } = await client.query(
      `
    INSERT INTO closetProduct_data ( closet_id, product_data_id, name , product_type)
    VALUES($1, $2, $3, $4)
    ON CONFLICT (closet_id, product_data_id) DO NOTHING
    RETURNING *;
      `,
      [closet_id, product_data_id, name, product_type]
    );
    return closetProduct_data;
  } catch (error) {
    throw error;
  }
}

async function getAllClosetProduct_data() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM closetProduct_data;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}
/*
- closet templates data

- product_data
*/
async function getClosetProduct_dataByCloset({ closet_id }) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM closetProduct_data
      WHERE "closet_id" = ${closet_id}
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateCloset({ id, ...fields }) {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let closet;
    if (util.dbFields(fields).insert.length > 0) {
      const { rows } = await client.query(
        `
          UPDATE closets 
          SET ${util.dbFields(toUpdate).insert}
          WHERE id=${id}
          RETURNING *;
      `,
        Object.values(toUpdate)
      );
      closet = rows[0];
      return closet;
    }
  } catch (error) {
    throw error;
  }
}
async function updateClosetProduct_dataById({
  closetProduct_data_id,
  ...fields
}) {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let closetProduct_data;
    if (util.dbFields(fields).insert.length > 0) {
      const { rows } = await client.query(
        `
        UPDATE closetProduct_data
        SET ${util.dbFields(toUpdate).insert}
        WHERE closetProduct_data_id = ${closetProduct_data_id}
        RETURNING *;
      `,
        Object.values(toUpdate)
      );
      closetProduct_data = rows[0];
      return closetProduct_data;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyClosetProduct_dataById(closetProduct_data_id) {
  try {
    const {
      rows: [closetProduct_data],
    } = await client.query(
      `
        DELETE FROM closetProduct_data 
        WHERE closetProduct_data_id = $1
        RETURNING *;
    `,
      [closetProduct_data_id]
    );
    return closetProduct_data;
  } catch (error) {
    throw error;
  }
}

async function canEditClosetProduct_data(closetProduct_data_id, customer_id) {
  const {
    rows: [closetFromClosetProduct_data],
  } = await client.query(
    `
      SELECT * FROM closetProduct_data
      JOIN closets ON closetProduct_data."closet_id" = closet_id
      AND closetProduct_data_id = $1
    `,
    [closetProduct_data_id]
  );
  return closetFromClosetProduct_data.creator_id === customer_id;
}

module.exports = {
  getClosetProduct_dataById,
  addProduct_dataToCloset,
  getAllClosetProduct_data,
  getClosetProduct_dataByCloset,
  //   createClosetProduct_data,
  updateClosetProduct_data,
  destroyClosetProduct_data,
  canEditClosetProduct_data,
};
