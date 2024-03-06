export class Facultylist{
    facultyID :string | undefined
    firstName :string | undefined
    lastName :string | undefined
    userName :string | undefined
    email :string | undefined
    dept :string | undefined
    courses  : Course[] | undefined;
    subjects : Subject[] | undefined;
}

export class Course{
    courseId :number | undefined
    courseName :number | undefined
}

export class Subject{
    subjectId :number | undefined
    subjectName :number | undefined
}