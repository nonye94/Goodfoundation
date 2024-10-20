const Timetable= require("../models/Timetable");
const Response = require("../models/Response");
const pool = require("../database/db_client");

class TimetableRepository {
  async getAll() {
    try {
      const sql = "SELECT * FROM timetable";
      const result = await pool.query(sql);
      return new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getById(id) {
    try {
      const sql = "SELECT * FROM timetable WHERE id=$1";
      const values = [id];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `timetable with id: '${id}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
  
  async save(timetable) {
    try {
      // Check if the departmentId exists in the 'department' table, not in 'timetable'
      const checkDepartment = await pool.query("SELECT id FROM department WHERE id=$1", [timetable.departmentId]);
      if (checkDepartment.rowCount == 0) {
        return new Response(false, `Department with id '${timetable.departmentId}' does not exist.`, null);
      }
  
      // Inserting timetable
      const sql = "INSERT INTO timetable(departmentId, year) VALUES($1, $2)";
      const values = [timetable.departmentId, timetable.year];
      await pool.query(sql, values);
      return new Response(true, null, timetable);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
  

  async update(id, timetable) {
    try {
      const getId = await pool.query("SELECT id FROM timetable WHERE id=$1", [id]);
  
      if (getId.rowCount == 0) {
        return new Response(
          true,
          `timetable with id: '${id}' does not exist.`,
          null
        );
      }
  
      const sql = "UPDATE timetable SET year=$1, departmentId=$2 WHERE id=$3";
      const values = [timetable.year, timetable.departmentId, id];
      await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
  
  async delete(id) {
    try {
      const getId = await pool.query("SELECT id FROM timetable WHERE id=$1", [
        departmentId,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `timetable with departmentId: '${id}' does not exist.`,
          null
        )
      }

      const sql = "DELETE FROM timetable WHERE id=$1 ";
      const values = [id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
}

module.exports = TimetableRepository;
