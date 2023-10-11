const express = require("express");
const router = express.Router();
const {
  getAllCostumes_data,
  getCostumes_dataById,
  updateCostumes_dataById,
  createCostumes_data,
  deleteCostumes_dataById,
  deleteAllCostumes_data,
} = require("../db/helpers/costumes_data");
const { requireCustomer } = require("./utils");

// GET /api/costumes_data
router.get("/", async (req, res, next) => {
  try {
    const costumes_data = await getAllCostumes_data();
    res.send(costumes_data);
  } catch (error) {
    next(error);
  }
});

// GET /api/costumes_data/:costumes_dataId
router.get("/:costumes_dataById", async (req, res, next) => {
  try {
    const costumes_data = await getCostumes_dataById(
      req.params.costumes_dataById
    );
    res.send(costumes_data);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/costumes_data/:costumes_dataId
router.patch("/:costumes_dataById", async (req, res, next) => {
  try {
    const costumes_data = await updateCostumes_dataById(
      req.params.costumes_dataById,
      req.body
    );
    res.send(costumes_data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const costumes_data = await createCostumes_data(req.body);
    res.send(costumes_data);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/costumes_data/:costumes_dataId
router.delete("/:costumes_data_id", async (req, res, next) => {
  try {
    const costumes_data = await deleteCostumes_dataById(
      req.params.costumes_data_id
    );
    res.send(costumes_data_id);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/costumes_data
router.delete("/", async (req, res, next) => {
  try {
    const costumes_data = await deleteAllCostumes_data();
    res.send(costumes_data);
  } catch (error) {
    next(error);
  }
});

// export router
module.exports = router;
