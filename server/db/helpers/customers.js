const client = require("../client");

// customer functions
const getAllCustomers = async () => {
  try {
    const { rows } = await client.query(`
			  SELECT *
			  FROM customers;
			  `);
    console.log("rows: ", rows);
    return rows;
  } catch (error) {
    throw error;
  }
};

async function getCustomersById(customer_id) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
						SELECT *
						FROM customers
						WHERE customer_id =${customer_id};
					`
    );
    return customer;
  } catch (error) {
    throw error;
  }
}

const createCustomers = async ({ name, username, password, fav_brand }) => {
  const {
    rows: [customer],
  } = await client.query(
    `
			  INSERT INTO customers(name, username, password, fav_brand)
			  VALUES ($1, $2, $3, $4)
			  RETURNING *
		  `,
    [name, username, password, fav_brand]
  );
  return customer;
};

async function updateCustomersById(customer_id, fields = {}) {
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
      rows: [customer],
    } = await client.query(
      `
		  UPDATE customers
		  SET ${setString}
		  WHERE id=${customer_id}
		  RETURNING *;
		  `,
      Object.values(fields)
    );
    return customer;
  } catch (error) {
    throw error;
  }
}

async function getCustomers({ username, password }) {
  if (!username || !password) {
    return null; // Return null or handle the case where username or password is missing
  }

  try {
    const customer = await getCustomersByUsername(username);
    if (!customer) return null; // Return null if customer is not found
    const hashedPassword = customer.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return null; // Return null if passwords don't match
    // Delete the 'password' key from the returned object
    delete customer.password;
    return customer;
  } catch (error) {
    throw error;
  }
}

async function getCustomersByIdDelPword(customer_id) {
  // first get the customer
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
    SELECT * 
	FROM customers
	WHERE customers.customer_id = $1;
    `[customer_id]
    );
    // if it doesn't exist, return null
    if (!customer) return null;
    // if it does:
    // delete the 'password' key from the returned object
    delete customer.password;
    return customer;
  } catch (error) {
    throw error;
  }
}

const getCustomersByUsername = async (username) => {
  const {
    rows: [customer],
  } = await client.query(
    `
		SELECT * 
		FROM customers
		WHERE customers.username = $1
		`,
    [username]
  );
  return customer;
};

module.exports = {
  getAllCustomers,
  getCustomersById,
  createCustomers,
  updateCustomersById,
  getCustomers,
  getCustomersByIdDelPword,
  getCustomersByUsername,
};
