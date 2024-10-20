const express = require('express');
const TimetableCourseController = require('../controllers/timetableCourseController');

const router = express.Router();
const timetableCourseController = new TimetableCourseController();

router.get('/', timetableCourseController.getAll);
router.get('/:id', timetableCourseController.getById);
router.get('/timetableCourseId/:timetableCourseId', timetableCourseController.getByTimetable);
router.post('/', timetableCourseController.save);
router.put('/:id', timetableCourseController.update);
router.delete("/:id", timetableCourseController.delete);

module.exports = router;