const AcademicStaff = require("../models/academicStaff");
const Response = require("../models/Response");
const pool = require("../database/db_client");

class AcademicStaffRepository {
  async getAll() {
    try {
      const sql = "SELECT * FROM AcademicStaff";
      const result = await pool.query(sql);
      return new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getById(id) {
    try {
      const sql = "SELECT * FROM AcademicStaff WHERE id=$1";
      const values = [id];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `AcademicStaff with id: '${id}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getByName(firstName) {
    try {
      const sql = "SELECT * FROM AcademicStaff WHERE LOWER(firstName)=$1";
      const values = [firstName.toLowerCase()];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `AcademicStaff with firstName: '${firstName}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async save(AcademicStaff) {
    try {
    // Check 
    const checkAcademicStaff = await pool.query("SELECT id FROM AcademicStaff WHERE id=$1", [
      course.firstName,
    ]);

      const sql = "INSERT INTO AcademicStaff(firstName, lastName, department, title ) VALUES($1, $2, $3, $4)";
      const values = [AcademicStaff.firstName, AcademicStaff.lastName,AcademicStaff.department,AcademicStaff.title];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async update(id, AcademicStaff) {
    try {
      const getId = await pool.query("SELECT id FROM AcademicStaff WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `AcademicStaff with id: '${id}' does not exist.`,
          null
        )
      }

      const sql = "UPDATE AcademicStaff SET firstName=$1, lastName=$2, department=$3, title=$4 WHERE id=$5";
      const values = [AcademicStaff.firstName, AcademicStaff.lastName,AcademicStaff.department,AcademicStaff.title, id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async delete(id) {
    try {
      const getId = await pool.query("SELECT id FROM AcademicStaff WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `AcademicStaff with id: '${id}' does not exist.`,
          null
        )
      }

      const sql = "DELETE FROM AcademicStaff WHERE id=$1 ";
      const values = [id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
}
module.exports = AcademicStaffRepository;
