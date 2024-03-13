export class StudentMarks{
    studentName : string = "";
    branch      : string = "";
    semester    : string = "";
    classRoom   : string = "";
    subjects    : Subjects[] | undefined;
}

export class Subjects{
    subjName   :string = "";
    marks      :number = 0;
}

export class Semester {
    name: string | undefined;
}

export class ClassRoom{
    name: string | undefined;
}