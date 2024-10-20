const express = require("express");
const departmentRoute = require("./routes/departmentRoute");
const assessmentRoute = require("./routes/assessmentRoute");
//cont.
 const AcademicStaffRoute = require("./routes/AcademicStaffRoute"); 
 const courseRoute = require("./routes/courseRoute");
 const studentAssessmentRoute = require("./routes/studentAssessmentRoute");
 const studentRoute= require("./routes/studentRoute");
const timetableCourseRoute= require("./routes/timetableCourseRoute");
 const timetableRoute= require("./routes/timetableRoute");

const app = express();



app.use(express.json());

app.use("/api/departments", departmentRoute);
app.use("/api/assessments", assessmentRoute);
//my continuation
app.use("/api/AcademicStaffs", AcademicStaffRoute);
app.use("/api/studentAssessments", studentAssessmentRoute);
 app.use("/api/courses", courseRoute);
 app.use("/api/timetableCourses", timetableCourseRoute);
 app.use("/api/timetables", timetableRoute);
 app.use("/api/students", studentRoute);


const port = 3007;
app.listen(port, () => console.log(`Listen on port ${port}`));
