import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Department, Subject } from '../models/department';
import { ClassRoom, Semester, StudentMarks, Subjects } from '../models/studentmarks';
import { NgZone } from '@angular/core';
import { FieldValidationPattern } from '../validationpatterns/FieldValidationPattern';
import { Sharedmodel } from '../sharedmodel';
import { NotificationtoasterService } from '../notificationtoaster.service';

@Component({
  selector: 'app-addstudentmarks',
  templateUrl: './addstudentmarks.component.html',
  styleUrls: ['./addstudentmarks.component.scss']
})
export class AddstudentmarksComponent {
  subjects :any[] = [];
  branchesList : Department[] = [];
  branches: Array<any> = [];
  allSubjects: Subject[] = [];
  matchedCourseDetails:any;
  studentExamMarksForm!: FormGroup;
  studentMarks = new StudentMarks();
  semester :Semester[] = [];
  classRoom :ClassRoom[] = [];

  @Output() reprtdataEvent = new EventEmitter<Sharedmodel>();

  constructor(private formBuilder: FormBuilder,private _service: ServicesService,private zone: NgZone,private _toaster:NotificationtoasterService){
    this.semester = [{ name: 'Midterm' },{ name: 'Final' }];
    this.classRoom = [{ name: 'A' },{ name: 'B' }];
  }

  ngOnInit(): void {
    this.buildForm();
    this._service.getDepartmentdata().subscribe(res => {
      this.branchesList = res.response;

      this.branches = this.branchesList.map((a: any) => { return a.departmentName });
    });
  }

  buildForm() {
    this.studentExamMarksForm = this.formBuilder.group({
      studentName: new FormControl("", [Validators.required,]),
      branch: new FormControl("", [Validators.required]),
      semester: new FormControl("", [Validators.required]),
      classroom: new FormControl("", [Validators.required]),
      subjects: this.formBuilder.group({})
    });
  }


  onBranchSelect(data :any){
    this.allSubjects = [];
    this.matchedCourseDetails =  this.branchesList.filter(x => x.departmentName === data.target.value)
    this.matchedCourseDetails[0].courses.forEach((course:any) => {
        this.allSubjects.push(...course.subjects);
    });
    if(this.allSubjects != null){
      const subjectsFormGroup = this.studentExamMarksForm.get('subjects') as FormGroup;
        // Remove all existing controls
      Object.keys(subjectsFormGroup.controls).forEach(key => {
        subjectsFormGroup.removeControl(key);
      });
      this.allSubjects.forEach((subject:any) => {
        subjectsFormGroup.addControl(subject.subjectName, new FormControl('', [Validators.required,Validators.pattern(FieldValidationPattern.NumberPattern)]));
      });
    }
  }

  Save(){
      console.log(this.studentExamMarksForm.value);
      this.studentMarks.studentName = this.studentExamMarksForm.get('studentName')?.value;
      this.studentMarks.branch = this.studentExamMarksForm.get('branch')?.value;
      this.studentMarks.semester = this.studentExamMarksForm.get('semester')?.value;
      this.studentMarks.classRoom = this.studentExamMarksForm.get('classroom')?.value;
      this.studentMarks.subjects = [];
      // Update subjects array
      this.studentMarks.subjects = Object.keys(this.studentExamMarksForm.get('subjects')?.value ).map((key:string) => {
        const subject = new Subjects();
        subject.subjName = key;
        subject.marks = parseInt(this.studentExamMarksForm.get('subjects')?.value[key]);
        return subject;
      });

      this._service.postStudentExamMarks(this.studentMarks).subscribe(res =>{
         if(res.response == "Success"){
            this._toaster.Success("Successfully StudentMarks are Saved");
            this.allSubjects = [];
            this.studentExamMarksForm.reset();

            const subjectsFormGroup = this.studentExamMarksForm.get('subjects') as FormGroup;
            // Remove all existing controls
            Object.keys(subjectsFormGroup.controls).forEach(key => {
              subjectsFormGroup.removeControl(key);
            });

            this.studentExamMarksForm.controls['studentName'].patchValue("");
            this.studentExamMarksForm.controls['branch'].patchValue("");
            this.studentExamMarksForm.controls['semester'].patchValue("");
            this.studentExamMarksForm.controls['classroom'].patchValue("");
         }
         if(res.response != "Success"){
          this._toaster.Error(res.response);
         }
      },
      (error) => {
        if (error.status === 401) {
          this._toaster.Error("Unauthorized");
        } else if (error.status === 404) {
          this._toaster.Error("Not Found");
        } else if (error.status === 500) {
          this._toaster.Error("Internal Server Error");
        } else {
          this._toaster.Error("An error occurred");
        }
      });
  }

  Cancel(){
     let facultyReport = new Sharedmodel();
     this.reprtdataEvent.emit(facultyReport);
  }

  onSemesterSelect(data:any){

  }

  onClassSelect(data:any){
    //this.clearSubjects();
  }
}
