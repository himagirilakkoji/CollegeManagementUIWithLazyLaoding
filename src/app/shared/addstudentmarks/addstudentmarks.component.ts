import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Department, Subject } from '../models/department';
import { ClassRoom, Semester, StudentMarks, Subjects } from '../models/studentmarks';
import { NgZone } from '@angular/core';

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

  constructor(private formBuilder: FormBuilder,private _service: ServicesService,private zone: NgZone){
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
      branch: new FormControl("Select menu", [Validators.required]),
      semester: new FormControl("Select menu", [Validators.required]),
      classroom: new FormControl("Select menu", [Validators.required]),
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
        subjectsFormGroup.addControl(subject.subjectName, new FormControl('', Validators.required));
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
            alert("Successfully StudentMarks are Saved");
         }
         if(res.response == "Already exists"){
          alert(res.response);
         }
         this.studentExamMarksForm.controls['studentName'].patchValue('');
         this.studentExamMarksForm.controls['branch'].patchValue('Select menu');
         this.studentExamMarksForm.controls['semester'].patchValue('Select menu');
         this.studentExamMarksForm.controls['classroom'].patchValue('Select menu');
         //this.studentExamMarksForm.controls['subjects'].reset();
      });
  }

  Cancel(){

  }

  onSemesterSelect(data:any){

  }

  onClassSelect(data:any){
    this.clearSubjects();
  }

  clearSubjects() {
    const subjectsFormGroup = this.studentExamMarksForm.get('subjects') as FormGroup;
    Object.keys(subjectsFormGroup.controls).forEach(key => {
        setTimeout(() => {
            subjectsFormGroup.controls[key].setValue('');
        }, 0);
    });
}



}
