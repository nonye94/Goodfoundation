const Student= require("../models/Student");
const Response = require("../models/Response");
const pool = require("../database/db_client");

class StudentRepository {
  async getAll() {
    try {
      const sql = "SELECT * FROM student";
      const result = await pool.query(sql);
      return new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getById(id) {
    try {
      const sql = "SELECT * FROM student WHERE id=$1";
      const values = [id];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `student with id: '${id}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getByFirstName(firstName) {
    try {
      const sql = "SELECT * FROM student WHERE LOWER(firstName)=$1";
      const values = [firstName.toLowerCase()];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `student with firstName: '${firstName}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
  
  async save(student) {
    try {

      // Check if the timetable exists
    const checkTimetable = await pool.query("SELECT id FROM timetable WHERE id=$1", [student.timetableId]);
    if (checkTimetable.rowCount == 0) {
      return new Response(false, `Timetable with id '${student.timetableId}' does not exist.`, null);
    }

      const sql = "INSERT INTO student(firstName, lastName, dob,departmentId,timetableId) VALUES($1, $2,$3,$4,$5)";
      const values = [student.firstName, student.lastName,student.dob,student.departmentId,student.timetableId];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }

    
  }

  async update(id, student) {
    try {
      const getId = await pool.query("SELECT id FROM student WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `Student with id: '${id}' does not exist.`,
          null
        )
      }
      
      const sql = "UPDATE student SET firstName=$1, lastName=$2 departmentId=$3, dob=$4, timetableId=$5 WHERE id=$6";
      const values = [student.firstName, student.lastName,student.dob,student.departmentId,student.timetableId, id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async delete(id) {
    try {
      const getId = await pool.query("SELECT id FROM student WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `Student with id: '${id}' does not exist.`,
          null
        )
      }

      const sql = "DELETE FROM student WHERE id=$1 ";
      const values = [id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
}

module.exports = StudentRepository;
