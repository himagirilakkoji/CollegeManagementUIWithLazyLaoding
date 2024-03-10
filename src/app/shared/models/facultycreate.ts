export class Facultycreate {
    facultyId:string | undefined;
    firstName: string | undefined;
    lastName : string | undefined;
    userName : string | undefined;
    email    : string | undefined;
    password : string | undefined;
    dept     : string | undefined;
    courseRequests  : Courses[] | undefined;
    subjectRequests : Subjects[] | undefined;
}

export class Courses {
    dept :      string |undefined
    courseName: string | undefined;
}

export class Subjects {
    courseName  : string | undefined;
    subjectName: string | undefined;
}