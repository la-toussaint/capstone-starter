const express = require("express");
const router = express.Router();
const {
	
	createUsers,
	getAllUsers,
	getUsersById,
	getUsersByUsername,
	updateUsersById,
	deleteAllUsers,
	deleteUsersById
} = require("./db/helpers/cap-users")



// GET /api/user
router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/user/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await getUsersById(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:username", async (req, res, next) => {
	try {
	  const user = await getUsersByUsername(req.params.username, req,body);
	  res.send(user);
	} catch (error) {
	  next(error);
	}
  });

router.post("/", async (req, res, next) => {
  try {
    const user = await createUsers(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/user/:userId
router.patch("/:user_id",  async (req, res, next) => {
  try {
    const user = await updateUsersById(req.params.user_id, req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/user/:userId
router.delete("/:user_id", async (req, res, next) => {
  try {
    const user = await deleteUsersById(req.params.user_id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/user
router.delete("/",  async (req, res, next) => {
  try {
    const users = await deleteAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// export router
module.exports = router;
