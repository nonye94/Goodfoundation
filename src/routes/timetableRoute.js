const express = require('express');
const TimetableController = require('../controllers/timetableController');

const router = express.Router();
const timetableController = new TimetableController();

router.get('/', timetableController.getAll);
router.get('/:id', timetableController.getById);
router.get('/departmentId/:departmentId', timetableController.getByDepartment);
router.post('/', timetableController.save);
router.put('/:id', timetableController.update);
router.delete("/:id", timetableController.delete);

module.exports = router;