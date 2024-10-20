const express = require("express");
const CourseController = require("../controllers/CourseController");

const router = express.Router();
const courseController = new CourseController();

router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);
router.get("/title/:title", courseController.getByTitle);
router.post("/", courseController.save);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);

module.exports = router;