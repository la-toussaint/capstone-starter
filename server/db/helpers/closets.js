const client = require("../client");
const { attachSneaks_dataToClosets } = require("./sneaks_data");
const { getCustomersByUsername } = require("./customers");
const util = require("./util");

async function getClosetById(closet_id) {
  try {
    const {
      rows: [closet],
    } = await client.query(
      `
      SELECT * FROM closets
      WHERE closet_id = $1
    `,
      [closet_id]
    );
    return closet;
  } catch (error) {
    throw error;
  }
}

async function getClosetsWithoutSneaks_data() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM closets;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getAllClosets() {
  try {
    const { rows: closets } = await client.query(`
    SELECT closets.*, customers.username AS "creatorName"
    FROM closets
    JOIN customers ON closets."creatorId" = customer_id 
    `);
    return attachSneaks_dataToClosets(closets);
  } catch (error) {
    throw error;
  }
}
async function getAllClosetsByUser({ username }) {
  try {
    const customer = await getCustomersByUsername(username);
    const { rows: closets } = await client.query(
      `
    SELECT closets.*, customers.username AS "creatorName"
    FROM closets
    JOIN customers ON closets."creatorId" = customer_id 
    WHERE "creatorId" = $1
    `,
      [customer_id]
    );
    return attachSneaks_dataToClosets(closets);
  } catch (error) {
    throw error;
  }
}
async function getTemplateClosetsByCustomer({ username }) {
  try {
    const customer = await getCustomersByUsername(username);
    const { rows: closets } = await client.query(
      `
    SELECT closets.*, customers.username AS "creatorName"
    FROM closets
    JOIN customers ON closets."creatorId" = customer_id 
    WHERE "creatorId" = $1
    AND "isTemplate" = true
    `,
      [customer_id]
    );
    return attachSneaks_dataToClosets(closets);
  } catch (error) {
    throw error;
  }
}
async function getAllTemplateClosets() {
  try {
    const { rows: closets } = await client.query(`
    SELECT closets.*, customers.username AS "creatorName"
    FROM closets
    JOIN customers ON closets."creatorId" = customer_id
    WHERE "isTemplate" = true
    `);
    return attachSneaks_dataToClosets(closets);
  } catch (error) {
    throw error;
  }
}
/*
- user signs in for 1st time post-register => sees 3 template closets 

// ambersue 
- /my-closet = profile page 

Profile page houses:
(1) link to template closets (after registration, this is all they see) 
------
(2) customer closets 
(3) chosen products 
(4) they may directly link to products too (ie a list of all products with search bar)
  => make request for users closets
  => closet templates are public
          [
            {
            creatorId: "bruno",
            name: "Kickstand",
            background: "subway tiles",
            product_type: "sneaks_data",
            isTemplate: true,
          },
          {
            creatorId: "bruno",
            name: "boo!",
            background: "subway tiles",
            product_type: "halloween",
            isTemplate: true,
          }
        ]
    
  product_type === closet type


*/
async function getTemplateClosetsBySneaks_Data({ closets_id }) {
  try {
    const { rows: closets } = await client.query(
      `
      SELECT closets.*, customers.username AS "creatorName"
      FROM closets
      JOIN customers ON closets."creatorId" = customer_id
      JOIN closet_sneaks_data ON closet_sneaks_data."closetId" = closets.closet_id
      WHERE closets."isTemplate" = true
      AND closet_sneaks_data."sneaks_dataId" = $1;
    `,
      [sneaks_data_id]
    );
    return attachSneaks_dataToClosets(closets);
  } catch (error) {
    throw error;
  }
}

async function createCloset({
  creatorId,
  isTemplate,
  background,
  product_type,
}) {
  try {
    const {
      rows: [closet],
    } = await client.query(
      `
        INSERT INTO closets ("creatorId", "isTemplate", "background", "product_type")
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `,
      [creatorId, isTemplate, background, product_type]
    );

    return closet;
  } catch (error) {
    throw error;
  }
}

async function updateCloset({ closets_id, ...fields }) {
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
          WHERE closets_id=${closets_id}
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
async function destroyCloset(id) {
  try {
    await client.query(
      `
        DELETE FROM closet_sneaks_data 
        WHERE "closets_id" = $1;
    `,
      [closets_id]
    );
    const {
      rows: [closet],
    } = await client.query(
      `
        DELETE FROM closets 
        WHERE closets_id = $1
        RETURNING *
    `,
      [closets_id]
    );
    return closet;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getClosetById,
  getClosetsWithoutSneaks_data,
  getAllClosets,
  getAllTemplateClosets,
  getAllClosetsByUser,
  getTemplateClosetsByCustomer,
  getTemplateClosetsBySneaks_Data,
  createCloset,
  updateCloset,
  destroyCloset,
};
