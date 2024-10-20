const express = require("express");
const DepartmentController = require("../controllers/departmentController");

const router = express.Router();
const departmentController = new DepartmentController();

router.get("/", departmentController.getAll);
router.get("/:id", departmentController.getById);
router.get("/name/:name", departmentController.getByName);
router.post("/", departmentController.save);
router.put("/:id", departmentController.update);
router.delete("/:id", departmentController.delete);

module.exports = router;