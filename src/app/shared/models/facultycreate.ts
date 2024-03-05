export class Facultycreate {
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
    courseName: string | undefined;
}

export class Subjects {
    subjectName: string | undefined;
}