const CourseRepository = require('../repositories/CourseRepository')
const Joi = require("joi");
const Response = require("../models/Response");

const repository = new CourseRepository()

class CourseController{
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

  async getByTitle(req, res) {
    const title = req.params.title;
    console.log(title);
    const response = await repository.getByTitle(title);
    return response.success
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }
   //validation
  async save(req, res) {
    const  courseSchema = Joi.object({
      title: Joi.string().required(),
      code: Joi.number().required(),
      departmentId: Joi.number().required(),
    });

    const { error, value } = courseSchema.validate(req.body);

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

 module.exports = CourseController