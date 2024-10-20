const Assessment = require("../models/Assessment");
const Response = require("../models/Response");
const pool = require("../database/db_client");

class AssessmentRepository {
  async getAll() {
    try {
      const sql = "SELECT * FROM assessment";
      const result = await pool.query(sql);
      return new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getById(id) {
    try {
      const sql = "SELECT * FROM assessment WHERE id=$1";
      const values = [id];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `assessment with id: '${id}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getByName(name) {
    try {
      const sql = "SELECT * FROM assessment WHERE LOWER(name)=$1";
      const values = [name.toLowerCase()];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `assessment with name: '${name}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async save(assessment) {
    try {
  //validate
   
   const checkAssessment = await pool.query("SELECT id FROM assessment WHERE id=$1", [
    assessment.id,
  ]);

      const sql = "INSERT INTO assessment(name, percent) VALUES($1, $2)";
      const values = [assessment.name, assessment.percent];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async update(id, assessment) {
    try {
      const getId = await pool.query("SELECT id FROM assessment WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `assessment with id: '${id}' does not exist.`,
          null
        )
      }

      const sql = "UPDATE assessment SET name=$1, percent=$2 WHERE id=$3";
      const values = [assessment.name, assessment.percent, id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async delete(id) {
    try {
      const getId = await pool.query("SELECT id FROM assessment WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `assessment with id: '${id}' does not exist.`,
          null
        )
      }

      const sql = "DELETE FROM assessment WHERE id=$1 ";
      const values = [id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
}
module.exports = AssessmentRepository;
