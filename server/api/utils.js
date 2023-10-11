const client = require("../db/client");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

const authRequired = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  const validJWT = Boolean(jwt.verify(token, JWT_SECRET));

  console.log("Cookie Token:", token);
  try {
    if (validJWT) {
      res.json({ authorized: true });
    }
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }
};

function requireCustomer(req, res, next) {
	if (!req.customer) {
	  res.status(401);
	  next({
		name: "MissingCustomerError",
		message: "You must be logged in to perform this action"
	  });
	}
  
	next();
  }
  
  // takes required parameters as an array, returns a middleware function that sends back a message if they're not present
  const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
	return (req, res, next) => {
	  // for operations that need at least one param. Not all required.
	  if(atLeastOne) {
		let numParamsFound = 0;
		for(let param of requiredParams) {
		  if(req.body[param] !== undefined) {
			numParamsFound++;
		  }
		}
		if(!numParamsFound) {
		  next({
			name: 'MissingParams',
			message: `Must provide at least one of these in body: ${requiredParams.join(', ')}`
		  })
		} else {
		  next();
		}
	  } else {
		// figure out which ones are not defined, and return them
		const notSent = [];
		for(let param of requiredParams) {
		  if(req.body[param] === undefined) {
			notSent.push(param);
		  }
		}
		if(notSent.length) next({
		  name: 'MissingParams',
		  message: `Required Parameters not sent in body: ${notSent.join(', ')}`
		})
		next();
	  }
	}
  }
  
  module.exports = {
	requireCustomer,
	requiredNotSent,
  }
