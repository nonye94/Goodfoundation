const studentAssessmentRepository = require('../repositories/studentAssessmentRepository')
const Joi = require("joi");
const Response = require("../models/Response");

const repository = new studentAssessmentRepository()

class StudentAssessmentController{
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

  async getByName(req, res) {
    const name = req.params.name;
    console.log(name);
    const response = await repository.getByName(name);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }
   
    //validation
  async save(req, res) {
    const studentAssessmentSchema = Joi.object({
  id: Joi.number().required(),
  studentId: Joi.number().required(),
  year: Joi.number().required(),  
  assessmentId: Joi.number().required(),
  status: Joi.string().required(),
  course: Joi.string().required(),
  academicStaffId: Joi.number().required(),
    });

    const { error, value } =studentAssessmentSchema.validate(req.body);

    if (error) {
      return res.status(400).send(new Response(false, error.details, null));
    }
    

    const response = await repository.save(value);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }

  async update(req, res) {
    const studentAssessmentSchema = Joi.object({
  id: Joi.number().required(),
  studentId: Joi.number().required(),
  year: Joi.number().required(),  
  assessmentId: Joi.number().required(),
  status: Joi.string().required(),
  course: Joi.string().required(),
  academicStaffId: Joi.number().required(),
    });

    const { error, value } =studentAssessmentSchema.validate(req.body);

    if (error) {
      return res.status(400).send(new Response(false, error.details, null));
    }

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

 module.exports =StudentAssessmentController