const express = require("express");
const AcademicStaffController = require("../controllers/AcademicStaffController");

const router = express.Router();
const   academicStaffController = new AcademicStaffController();

router.get("/", academicStaffController.getAll);
router.get("/:id", academicStaffController.getById);
router.get("/name/:name", academicStaffController.getByName);
router.post("/", academicStaffController.save);
router.put("/:id", academicStaffController.update);
router.delete("/:id", academicStaffController.delete);

module.exports = router;