const express = require('express');
const AssessmentController = require('../controllers/assessmentController');

const router = express.Router();
const assessmentController = new AssessmentController();

router.get('/', assessmentController.getAll);
router.get('/:id', assessmentController.getById);
router.get('/name/:name', assessmentController.getByName);
router.post('/', assessmentController.save);
router.put('/:id', assessmentController.update);
router.delete("/:id", assessmentController.delete);

module.exports = router;
