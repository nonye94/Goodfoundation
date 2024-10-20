const express = require('express');
const StudentAssessmentController = require('../controllers/studentAssessmentController');

const router = express.Router();
const studentAssessmentController = new StudentAssessmentController();

router.get('/', studentAssessmentController.getAll);
router.get('/:id', studentAssessmentController.getById);
router.get('/StudentId/:StudentId', studentAssessmentController.getById);
router.post('/', studentAssessmentController.save);
router.put('/:id', studentAssessmentController.update);
router.delete("/:id", studentAssessmentController.delete);

module.exports = router;