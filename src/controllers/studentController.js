const  studentRepository = require('../repositories/studentRepository')
const Joi = require("joi");
const Response = require("../models/Response");

const repository = new  studentRepository()

class  StudentController{
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
    const response = await repository.getByFirstName(name);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }

   //validation
  async save(req, res) {
    const  studentSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      dob: Joi.string().required(), 
      departmentId: Joi.number().required(),
      timetableId: Joi.number().required(),
    });

    const { error, value } = studentSchema.validate(req.body);

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

 module.exports = StudentController