const express = require("express");
const router = express.Router();
const {
  getAllTemplateClosets,
  createCloset,
  updateCloset,
  getClosetById,
  destroyCloset,
  addSneaks_dataToCloset,
  getClosetSneaks_dataByCloset,
  addCostumes_dataToCloset,
  getClosetCostumes_dataByCloset,
} = require("../db/helpers/closets", "../db/helpers/costumes_data", "../db/helpers/sneaks_data");;
const { requireCustomer, requiredNotSent } = require("./utils");

// GET /api/closets
router.get("/", async (req, res, next) => {
  try {
    // TODO - send back all data, including private, if token present. This would mean adding only the data for the customer that matches the request
    const closets = await getAllTemplateClosets();
    res.send(closets);
  } catch (error) {
    next(error);
  }
});

// POST /api/closets
router.post(
  "/",
  requireCustomer,
  requiredNotSent({ requiredParams: ["name", "product_type"] }),
  async (req, res, next) => {
    try {
      const { name, product_type } = req.body;
      const createdCloset = await createCloset({
        creatorId: req.customer_id,
        name,
        product_type,
        isTemplate: req.body.isTemplate,
      });
      if (createdCloset) {
        res.send(createdCloset);
      } else {
        next({
          name: "FailedToCreate",
          message: "There was an error creating your closet",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /api/closets/:closet_id
router.patch(
  "/:closetId",
  requireCustomer,
  requiredNotSent({
    requiredParams: ["name", "background", "product_type", "isTemplate"],
    atLeastOne: true,
  }),
  async (req, res, next) => {
    try {
      const { name, background, product_type, isTemplate } = req.body;
      const { closetId } = req.params.body;
      const closetToUpdate = await getClosetById(closet_id);
      if (!closetToUpdate) {
        next({
          name: "NotFound",
          message: `No closet by ID ${closet_id}`,
        });
      } else if (req.customer_id !== closetToUpdate.creatorId) {
        res.status(403);
        next({
          name: "WrongCustomerError",
          message:
            "You must be the same customer who created this closet to perform this action",
        });
      } else {
        const updatedCloset = await updateCloset({
          id: "closet_id",
          name,
		  background,
          product_type,
          isTemplate,
        });
        if (updatedCloset) {
          res.send(updatedCloset);
        } else {
          next({
            name: "FailedToUpdate",
            message: "There was an error updating your closet",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/closets/:closet_id
router.delete("/:closet_id", requireCustomer, async (req, res, next) => {
  try {
    const { closet_id } = req.params;
    const closetToUpdate = await getClosetById(closet_id);
    if (!closetToUpdate) {
      next({
        name: "NotFound",
        message: `No closet by ID ${closet_id}`,
      });
    } else if (req.customer_id !== closetToUpdate.creatorId) {
      res.status(403);
      next({
        name: "WrongCustomerError",
        message:
          "You must be the same customer who created this closet to perform this action",
      });
    } else {
      const deletedCloset = await destroyCloset(closet_id);
      res.send({ success: true, ...deletedCloset });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/closets/:closetId/activities
router.post(
  "/:closet_id/sneaks_data",
  requiredNotSent({
    requiredParams: ["sneaks_data_id", "name", "product_type"],
  }),
  async (req, res, next) => {
    try {
      const { sneaks_data_id, name, product_type } = req.body;
      const { closet_id } = req.params;
      const foundClosetSneaks_data = await getClosetSneaks_dataByCloset({
        id: closet_id,
      });
      const existingClosetSneaks_data =
        foundClosetSneaks_data &&
        foundClosetSneaks_data.filter(
          (closetSneaks_data) =>
            closetSneaks_data.sneaks_data_id === sneaks_data_id
        );
      if (existingClosetSneaks_data && existingClosetSneaks_data.length) {
        next({
          name: "ClosetSneaks_dataExistsError",
          message: `A closet_sneaks_data by that closet_id ${closet_id}, sneaks_data_id ${sneaks_data_id} combination already exists`,
        });
      } else {
        const createdClosetSneaks_data = await addSneaks_dataToCloset({
          closet_id,
          sneaks_data_id,
          name,
          product_type,
        });
        if (createdClosetSneaks_data) {
          res.send(createdClosetSneaks_data);
        } else {
          next({
            name: "FailedToCreate",
            message: `There was an error adding sneaks_data ${sneaks_data_id} to closet ${closet_id}`,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post;
"/:closet_id/costumes_data",
  requiredNotSent({
    requiredParams: ["costumes_data_id", "name", "product_type"],
  }),
  async (req, res, next) => {
    try {
      const { costumes_data_id, name, product_type } = req.body;
      const { closet_id } = req.params;
      const foundClosetCostumes_data = await getClosetCostumes_dataByCloset({
        id: closet_id,
      });
      const existingClosetCostumes_data =
        foundClosetCostumes_data &&
        foundClosetCostumes_data.filter(
          (closetCostumes_data) =>
            closetCostumes_data.costumes_data_id === costumes_data_id
        );
      if (existingClosetCostumes_data && existingClosetCostumes_data.length) {
        next({
          name: "ClosetCostumes_dataExistsError",
          message: `A closet_costumes_data by that closet_id ${closet_id}, costumes_data_id ${costumes_data_id} combination already exists`,
        });
      } else {
        const createdClosetCostumes_data = await addCostumes_dataToCloset({
          closet_id,
          costumes_data_id,
          name,
          product_type,
        });
        if (createdClosetCostumes_data) {
          res.send(createdClosetCostumes_data);
        } else {
          next({
            name: "FailedToCreate",
            message: `There was an error adding costumes_data ${costumes_data_id} to closet ${closet_id}`,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };

module.exports = router;
