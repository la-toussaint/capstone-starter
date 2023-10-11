const express = require("express");
const router = express.Router();
const {
  getAllSneaks_data,
  getSneaks_dataById,
  updateSneaks_dataById,
  createSneaks_data,
  deleteSneaks_dataById,
  deleteAllSneaks_data,
} = require("../db/helpers/sneaks_data");
const { requireCustomer } = require("./utils");

// GET /api/sneaks_data
router.get("/", async (req, res, next) => {
  try {
    const sneaks_data = await getAllSneaks_data();
    res.send(sneaks_data);
  } catch (error) {
    next(error);
  }
});

// GET /api/sneaks_data/:sneaks_dataId
router.get("/:sneaks_dataById", async (req, res, next) => {
  try {
    const sneaks_data = await getSneaks_dataById(req.params.sneaks_dataById);
    res.send(sneaks_data);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/sneaks_data/:sneaks_dataId
router.patch("/:sneaks_dataById", async (req, res, next) => {
  try {
    const sneaks_data = await updateSneaks_dataById(
      req.params.sneaks_dataById,
      req.body
    );
    res.send(sneaks_data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sneaks_data = await createSneaks_data(req.body);
    res.send(sneaks_data);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/sneaks_data/:sneaks_dataId
router.delete("/:sneaks_data_id", async (req, res, next) => {
  try {
    const sneaks_data = await deleteSneaks_dataById(req.params.sneaks_data_id);
    res.send(sneaks_data_id);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/sneaks_data
router.delete("/", async (req, res, next) => {
  try {
    const sneaks_data = await deleteAllSneaks_data();
    res.send(sneaks_data);
  } catch (error) {
    next(error);
  }
});

// export router
module.exports = router;
