const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  getCustomersById,
  getCustomersByUsername,
  createCustomers,
  updateCustomersById,
  deleteAllCustomers,
  deleteCustomersById,
} = require("./db/helpers/customers");

// GET /api/customer
router.get("/", async (req, res, next) => {
  try {
    const customers = await getAllCustomers();
    res.send(customers);
  } catch (error) {
    next(error);
  }
});

// GET /api/customer/:customerId
router.get("/:customerId", async (req, res, next) => {
  try {
    const customer = await getCustomersById(req.params.customerId);
    res.send(customer);
  } catch (error) {
    next(error);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    const customer = await getCustomersByUsername(
      req.params.username,
      req,
      body
    );
    res.send(customer);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const customer = await createCustomers(req.body);
    res.send(customer);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/customer/:customerId
router.patch("/:customer_id", async (req, res, next) => {
  try {
    const customer = await updateCustomersById(
      req.params.customer_id,
      req.body
    );
    res.send(customer);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/customer/:customerId
router.delete("/:customer_id", async (req, res, next) => {
  try {
    const customer = await deleteCustomersById(req.params.customer_id);
    res.send(customer);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/customer
router.delete("/", async (req, res, next) => {
  try {
    const customers = await deleteAllCustomers();
    res.send(customers);
  } catch (error) {
    next(error);
  }
});

// export router
module.exports = router;
