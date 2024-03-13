export class Subject {
    subjectId: number | undefined;
    subjectName: string | undefined;
}

export class Course {
    courseId: number | undefined;
    courseName: string | undefined;
    subjects: Subject[] | undefined;
}

export class Department {
    departmentId: number | undefined;
    departmentName: string | undefined;
    courses: Course[] | undefined;
}