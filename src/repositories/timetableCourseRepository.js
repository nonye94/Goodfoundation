const TimetableCourse= require("../models/TimetableCourse");
const Response = require("../models/Response");
const pool = require("../database/db_client");

class TimetableCourseRepository {
  async getAll() {
    try {
      const sql = "SELECT * FROM timetableCourse";
      const result = await pool.query(sql);
      return new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getById(id) {
    try {
      const sql = "SELECT * FROM timetableCourse WHERE id=$1";
      const values = [id];
      const result = await pool.query(sql, values);
      return result.rowCount == 0
        ? new Response(
            true,
            `timetableCourse with id: '${id}' does not exist.`,
            null
          )
        : new Response(true, null, result.rows);
    } catch (error) {
      return new Response(false, error.message, null);
    }
  }

  async getByName(timetableId) {
    try {
        const sql = "SELECT * FROM timetableCourse WHERE timetableId=$1";
        const values = [timetableId];
        const result = await pool.query(sql, values);
        return result.rowCount == 0
            ? new Response(true, `TimetableCourse with timetableId: '${timetableId}' does not exist.`, null)
            : new Response(true, null, result.rows);
    } catch (error) {
        return new Response(false, error.message, null);
    }
}
  
  async save(timetableCourse) {
    try {
        // Check if timetableId is provided
        if (!timetableCourse.timetableId) {
            return new Response(false, "Timetable ID must be provided.", null);
        }

        // Check if the timetable exists
        const checkTimetable = await pool.query("SELECT id FROM timetable WHERE id=$1", [timetableCourse.timetableId]);
        if (checkTimetable.rowCount === 0) {
            return new Response(false, `Timetable with id '${timetableCourse.timetableId}' does not exist.`, null);
        }

        const sql = "INSERT INTO timetableCourse(timetableId, courseId, academicStaffs, days, starttime, endtime) VALUES($1, $2, $3, $4, $5, $6)";
        const values = [
            timetableCourse.timetableId,
            timetableCourse.courseId,
            timetableCourse.academicStaffs,
            timetableCourse.days,
            timetableCourse.starttime,
            timetableCourse.endtime
        ];
        await pool.query(sql, values);
        return new Response(true, "TimetableCourse added successfully.", null);
    } catch (error) {
        return new Response(false, error.message, null);
    }
}
  async update(id, timetableCourse) {
    try {
        if (!timetableCourse.timetableId) {
            return new Response(false, "Timetable ID must be provided for update.", null);
        }

        const getId = await pool.query("SELECT id FROM timetableCourse WHERE id=$1", [id]);
        if (getId.rowCount === 0) {
            return new Response(true, `TimetableCourse with id: '${id}' does not exist.`, null);
        }

        const sql = "UPDATE timetableCourse SET timetableId=$1, courseId=$2, academicStaffs=$3, days=$4, starttime=$5, endtime=$6 WHERE id=$7";
        const values = [
            timetableCourse.timetableId,
            timetableCourse.courseId,
            timetableCourse.academicStaffs,
            timetableCourse.days,
            timetableCourse.starttime,
            timetableCourse.endtime,
            id
        ];
        const result = await pool.query(sql, values);

        return result.rowCount === 0 
            ? new Response(false, `No updates made for TimetableCourse with id: '${id}'.`, null)
            : new Response(true, "TimetableCourse updated successfully.", null);
    } catch (error) {
        return new Response(false, error.message, null);
    }
}

  

async delete(id) {
  try {
      const getId = await pool.query("SELECT id FROM timetableCourse WHERE id=$1", [id]);
      if (getId.rowCount == 0) {
          return new Response(true, `TimetableCourse with id: '${id}' does not exist.`, null);
      }

      const sql = "DELETE FROM timetableCourse WHERE id=$1";
      const values = [id];
      await pool.query(sql, values);
      return new Response(true, `TimetableCourse with id: '${id}' deleted successfully.`, null);
  } catch (error) {
      return new Response(false, error.message, null);
    }
  }
}

module.exports = TimetableCourseRepository;
