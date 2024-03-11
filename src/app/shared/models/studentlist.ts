export class Studentlist{
    studentID :number | undefined
    firstName :string | undefined
    lastName :string | undefined
    userName :string | undefined
    email :string | undefined
    password :string | undefined;
    facultyID : string | undefined;
    studentCourseVM  : StudentCourse[] | undefined;
    studentSubjectEntities : StudentSubject[] | undefined;
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