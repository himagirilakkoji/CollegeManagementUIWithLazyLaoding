export class Studentlist{
    studentID ="";
    firstName ="";
    lastName  ="";
    userName  ="";
    email     ="";
    facultyUserName ="";
    password ="";
    facultyID ="";
    studentCourseVM  : StudentCourse[] =[];
    studentSubjectEntities : StudentSubject[] =[];
}

export class StudentCourse{
    studentCourseID :number | undefined
    courseName :string | undefined
    branchName :string | undefined
    facultyID :number | undefined
}

export class StudentSubject{
    studentSubjectID :number | undefined
    subjectName :string | undefined
    facultyID :number | undefined   
}