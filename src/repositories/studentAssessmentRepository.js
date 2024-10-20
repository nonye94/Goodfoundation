const studentAssessment = require("../models/studentAssessment");
const Response = require("../models/Response");
const pool = require("../database/db_client");

class studentAssessmentRepository {
  async getAll() {
    try {
      const sql = "SELECT * FROM studentAssessment";
      const result = await pool.query(sql);
      return new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getByStudentId(id) {
    try {
      const sql = "SELECT * FROM studentAssessment WHERE id=$1";
      const values = [id];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            false,
            `studentAssessment with id: '${id}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getByName(studentId) {
    try {
      const sql = "SELECT * FROM studentAssessment WHERE studentId=$1";
      const values = [studentId];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            false,
            `studentAssessment with studentId: '${studentId}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async save(studentAssessment) {
    try {
      const sql = "INSERT INTO studentAssessment(studentId, year, assessmentId, status, course, academicStaffId) VALUES($1, $2, $3, $4, $5, $6)";
      const values = [
        studentAssessment.studentId,
        studentAssessment.year,
        studentAssessment.assessmentId,
        studentAssessment.status,
        studentAssessment.course,
        studentAssessment.academicStaffId
      ];

       

      await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async update(id, studentAssessment) {
    try {
      const sql = "UPDATE studentAssessment SET studentId=$1, year=$2, assessmentId=$3, status=$4, course=$5, academicStaffId=$6 WHERE id=$7";
      const values = [
        studentAssessment.studentId,
        studentAssessment.year,
        studentAssessment.assessmentId,
        studentAssessment.status,
        studentAssessment.course,
        studentAssessment.academicStaffId,
        id
      ];
      await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async delete(id) {
    try {
      const getId = await pool.query("SELECT id FROM studentAssessment WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          false,
          `studentAssessment with id: '${id}' does not exist.`,
          null
        );
      }

      const sql = "DELETE FROM studentAssessment WHERE id=$1";
      const values = [id];
      await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
}

module.exports = studentAssessmentRepository;
