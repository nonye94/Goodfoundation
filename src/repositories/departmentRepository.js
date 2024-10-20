const Department = require("../models/Department");
const Response = require("../models/Response");
const pool = require("../database/db_client");

class DepartmentRepository {
  async getAll() {
    try {
      const sql = "SELECT * FROM department";
      const result = await pool.query(sql);
      return new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getById(id) {
    try {
      const sql = "SELECT * FROM department WHERE id=$1";
      const values = [id];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `Department with id: '${id}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getByName(name) {
    try {
      const sql = "SELECT * FROM department WHERE LOWER(name)=$1";
      const values = [name.toLowerCase()];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `Department with name: '${name}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async save(department) {
    try {
      const getIdByName = await pool.query("SELECT id FROM department WHERE LOWER(name)=$1", [
        department.name.toLowerCase(),
      ]);

      if (getIdByName.rowCount == 1) {
        return new Response(
          true,
          `Department with name: '${department.name}' already exist.`,
          null
        )
      }

      const sql = "INSERT INTO department(name, year) VALUES($1, $2)";
      const values = [department.name, department.year];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async update(id, department) {
    try {
      const getId = await pool.query("SELECT id FROM department WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `Department with id: '${id}' does not exist.`,
          null
        )
      }
      const getIdByName = await pool.query("SELECT id FROM department WHERE LOWER(name)=$1", [
        department.name.toLowerCase(),
      ]);

      if (getIdByName.rowCount == 1 && getIdByName.rows[0].id != id) {
        return new Response(
          true,
          `Department with name: '${department.name}' already exist.`,
          null
        )
      }

      const sql = "UPDATE department SET name=$1, year=$2 WHERE id=$3";
      const values = [department.name, department.year, id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async delete(id) {
    try {
      const getId = await pool.query("SELECT id FROM department WHERE id=$1", [
        id,
      ]);

      if (getId.rowCount == 0) {
        return new Response(
          true,
          `Department with id: '${id}' does not exist.`,
          null
        )
      }

      const sql = "DELETE FROM department WHERE id=$1 ";
      const values = [id];
      const result = await pool.query(sql, values);
      return new Response(true, null, null);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }
}

module.exports = DepartmentRepository;
