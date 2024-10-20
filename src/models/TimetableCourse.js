class TimetableCourse {
  constructor(id,timetableId,courseId,academicStaffs, days,starttime, endtime ){
    this.id=id;
    this.timetableId= timetableId;
    this.courseId =courseId;
    this.academicStaffs= academicStaffs;
    this.days =days;
    this.starttime= starttime;
    this.endtime= endtime;
    
  }
}

module.exports=TimetableCourse