export const environment = {
    production: false,
    apiUrl: 'https://localhost:7286/',
    postLoginValidationUrl:"Api/Admin/LoginValidation",
    postFacultyUrl:"Api/Admin/CreateFaculty",
    getDepartmentDetailsUrl:"Api/Admin/GetDepartmentDetails",
    getFacultyListUrl:"Api/Admin/GetAllFaculties",
    getFacultyWithPaginationListUrl:"Api/Admin/GetAllFacultiesWithPagination",
    deleteFacultyByIdUrl:"Api/Admin/DeleteCurrentFaculty",
    updateFacultyByIdUrl:"Api/Admin/UpdateCurrentFaculty",
    postStudentUrl:"Api/Admin/CreateStudent",
    getAllStudentUrl:"Api/Admin/GetAllStudents",
    deleteStudentByIdUrl:"Api/Admin/DeleteCurrentStudent",
    postStudentExamMarksUrl:"Api/Admin/SaveStudentMarks",
    getCourseLevelReportByIdUrl:"Api/Admin/CourseLevelReport",
    getSubjectLevelReportByIdUrl:"Api/Admin/SubjectLevelReport",
    updateStudentByIdUrl:"Api/Admin/UpdateCurrentStudent",
    getStudentMarksByIdUrl:"Api/Admin/StudentMarksListById"
};
