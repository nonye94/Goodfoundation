const  timetableCourseRepository = require('../repositories/timetableCourseRepository')
const Joi = require("joi");
const Response = require("../models/Response");

const repository = new  timetableCourseRepository()

class  TimetableCourseController{
  async getAll(req, res) {
    const response = await repository.getAll();
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }

  async getById(req, res) {
    const idParam = req.params.id;
    const response = await repository.getById(idParam);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }

  async getByTimetable(req, res) {
    const timetableId = req.params.timetableId;
    console.log(timetableId);
    const response = await repository.getByTimetable(timetableId);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }
  
   //validation
  async save(req, res) {
    const timetableCourseSchema = Joi.object({
      timetableId: Joi.number().required(),
      courseId: Joi.number().required(),
      academicStaffs: Joi.string().required(),
      days: Joi.string().required(),
      starttime: Joi.number().required(),
      endtime: Joi.number().required(),
    });

    const { error, value } = timetableCourseSchema.validate(req.body);

    if (error) {
      return res.status(400).send(new Response(false, error.details, null));
    }
    

    const response = await repository.save(value);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }

  async update(req, res) {
    const idParam = req.params.id;
    const body = req.body;
    const response = await repository.update(idParam, body);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }

  async delete(req, res) {
    const idParam = req.params.id;
    const response = await repository.delete(idParam);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }
}

 module.exports = TimetableCourseController