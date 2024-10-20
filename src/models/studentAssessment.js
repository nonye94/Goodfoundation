class StudentAssessment {
  constructor(id, studentId, year,assessmentId,status,course,academicStaffId){
    this.id = id;
    this.studentId = studentId;
    this.year = year;
    this.assessmentId =assessmentId;
    this.status = status;
    this.course =course;
    this.academicStaffId =academicStaffId; 
  }
}

module.exports=StudentAssessment