const express = require('express');
const StudentController = require('../controllers/studentController');

const router = express.Router();
const studentController = new StudentController();

router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.get('/name/:name', studentController. getByName);
router.post('/', studentController.save);
router.put('/:id', studentController.update);
router.delete("/:id", studentController.delete);

module.exports = router;