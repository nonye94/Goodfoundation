const Course = require("../models/Course");
const Response = require("../models/Response");
const pool = require("../database/db_client");

class CourseRepository {
  async getAll() {
    try {
      const sql = "SELECT * FROM course";
      const result = await pool.query(sql);
      return new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getById(id) {
    try {
      const sql = "SELECT * FROM course WHERE id=$1";
      const values = [id];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `course with id: '${id}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getByTitle(title) {
    try {
      const sql = "SELECT * FROM course WHERE LOWER(title)=$1";
      const values = [title.toLowerCase()];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `course with title: '${title}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async save(course) {
    try {
      // Check if the CO exists in the department table
      const checkCourse = await pool.query("SELECT id FROM course WHERE id=$1", [
        course.courseId,
      ]);
  
      // If courseId does not exist, return an appropriate response
      if (checkCourse.rowCount == 0) {
        return new Response(
          true,
          `Course with id: '${course.courseId}' does not exist.`,
          null
        );
      }
  
      // If courseId exists, proceed to insert the course
      const sql = "INSERT INTO course(title, code, courseId) VALUES($1, $2, $3,)";
      const values = [course.title, course.code, course.departmentId];
      await pool.query(sql, values);
      
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async update(id, course) {
    try {
      const getId = await pool.query("SELECT id FROM course WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `Course with id: '${id}' does not exist.`,
          null
        )
      }

      const sql = "UPDATE course SET title=$1, code=$2, departmentId=$3 WHERE id=$4";
      const values = [course.title, course.code,course.departmentId, id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async delete(id) {
    try {
      const getId = await pool.query("SELECT id FROM course WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `Course with id: '${id}' does not exist.`,
          null
        )
      }

      const sql = "DELETE FROM course WHERE id=$1 ";
      const values = [id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
}
module.exports = CourseRepository;
