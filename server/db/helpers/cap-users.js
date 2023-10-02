const client = require("../../../../Coursework/Unit03/2306-GHP-ET-WEB-FT-SF/2306-GHP-ET-WEB-FT-SF/Unit-04/PokemonApp-Unit4/Pokemon-app/server/db/client");


// user functions
const createUsers = async ({ name, username, password, fav_pokemon }) => {
		const {
		  rows: [user],
		} = await client.query(
		  `
			  INSERT INTO users(name, username, password, fav_pokemon)
			  VALUES ($1, $2, $3, $4)
			  RETURNING *
		  `,
		  [name, username, password, fav_pokemon]
		)
		return user
	  }
 

async function getUsers({ username, password }) {
	if (!username || !password) {
	  return null; // Return null or handle the case where username or password is missing
	}
  
	try {
	  const user = await getUsersByUsername(username);
	  if (!user) return null; // Return null if user is not found
	  const hashedPassword = user.password;
	  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
	  if (!passwordsMatch) return null; // Return null if passwords don't match
	  // Delete the 'password' key from the returned object
	  delete user.password;
	  return user;
	} catch (error) {
	  throw error;
	}
  }

async function getUsersById(user_id) {
  // first get the user
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * 
	FROM users
	WHERE users.user_id = $1;
    `
    [user_id]);
    // if it doesn't exist, return null
    if (!user) return null;
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

const getUsersByUsername = async (username) => {
	const {
		rows: [user],
	  } = await client.query(
		`
		SELECT * 
		FROM users
		WHERE users.username = $1
		`,
		[username]
	  )
	  return user
	}
  
module.exports = {
  createUsers,
  getUsers,
  getUsersById,
  getUsersByUsername,
};
