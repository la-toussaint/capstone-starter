const express = require("express");
const router = express.Router();
const {
  updateClosetProduct_data,
  destroyClosetProduct_data,
  getClosetProduct_dataById,
} = require("../db/helpers/closetProduct_data");
const client = require("../db/client");
const { requireCustomer, requiredNotSent } = require("./utils");

// PATCH /api/closet_activities/:closetProduct_data_id
router.patch(
  "/:closetProduct_data_id",
  requireCustomer,
  requiredNotSent({
    requiredParams: ["name", "product_type"],
    atLeastOne: true,
  }),
  async (req, res, next) => {
    try {
      const { name, product_type } = req.body;
      const { closetProduct_data_id } = req.params;
      const closetProduct_dataToUpdate = await getClosetProduct_dataById(
        closetProduct_data_id
      );
      if (!closetProduct_dataToUpdate) {
        next({
          name: "NotFound",
          message: `No closetProduct_data found by ID ${closetProduct_data_id}`,
        });
      } else {
        if (
          !(await canEditClosetProduct_data(
            req.params.closetProduct_data_id,
            req.customer_id
          ))
        ) {
          res.status(403);
          next({
            name: "Unauthorized",
            message: "You cannot edit this closetProduct_data!",
          });
        } else {
          const updatedClosetProduct_data = await updateClosetProduct_data({
            id: req.params.closetProduct_data_id,
            name,
            product_type,
          });
          res.send(updatedClosetProduct_data);
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/closet_activities/:closetProduct_data_id
router.delete(
  "/:closetProduct_data_id",
  requireCustomer,
  async (req, res, next) => {
    try {
      if (
        !(await canEditClosetProduct_data(
          req.params.closetProduct_data_id,
          req.customer_id
        ))
      ) {
        res.status(403);
        next({
          name: "Unauthorized",
          message: "You cannot edit this closetProduct_data!",
        });
      } else {
        const deletedClosetProduct_data = await destroyClosetProduct_data(
          req.params.closetProduct_data_id
        );
        res.send({ success: true, ...deletedClosetProduct_data });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
