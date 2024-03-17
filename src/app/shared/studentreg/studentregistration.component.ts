import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { Sharedmodel } from 'src/app/shared/sharedmodel';
import { Facultylist } from 'src/app/shared/models/facultylist';
import { StudentFaculty, Studentregistration } from '../models/Studentregistration';
import { NotificationtoasterService } from '../notificationtoaster.service';
import { FieldValidationPattern } from '../validationpatterns/FieldValidationPattern';
import { Studentlist } from '../models/studentlist';


@Component({
  selector: 'app-studentregistration',
  templateUrl: './studentregistration.component.html',
  styleUrls: ['./studentregistration.component.scss']
})
export class StudentRegistrationComponent implements OnInit, OnChanges {
  studentRegisterForm!: FormGroup;
  branches: Array<any> = [];
  branchesList: Array<any> = [];
  facultyList : Facultylist[] = [];
  studentFaculty : Array<StudentFaculty> = [];
  registerStuObj = new Sharedmodel();
  studentRegistration = new Studentregistration();
  editCurrentStudentData = new Studentlist();
  regFlag :boolean = false;

  @Input() editStudentData: any;
  @Output() regStuDataEvent = new EventEmitter<Sharedmodel>();

  constructor(private formBuilder: FormBuilder,private _service: ServicesService,private _toaster:NotificationtoasterService){

  }

  ngOnChanges(changes: SimpleChanges) {
       if(this.editStudentData.currentStudent.email != "" ){
          this.regFlag = this.editStudentData.commondata.isEditStudentClicked;
          this.buildForm();
          this.editCurrentStudentData = this.editStudentData.currentStudent;
          if(this.editCurrentStudentData != null){
              this.UpdateForm(this.editCurrentStudentData);
          }
       }
  }

  editFaculty:any[] =[];
  UpdateForm(data:any){
    let getAllFaultites = [];
    this.studentFaculty =[];
    this._service.getFacultyListdata().subscribe(res => {
      this.facultyList = res.response;

      this._service.getDepartmentdata().subscribe(res => {
        this.branchesList = res.response;
        this.branches = this.branchesList.map((a: any) => { return a.departmentName });

        if(this.facultyList != null && this.facultyList.length>0){
          getAllFaultites = this.facultyList.filter((item:any) => item.dept === data.studentCourseVM[0].branchName);
          this.studentFaculty = getAllFaultites.map((item:any) => item.userName);
          this.editFaculty = this.studentFaculty.filter((item:any) => item === data.facultyUserName);
  
          this.studentRegisterForm.setValue({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: '',
            branch: data.studentCourseVM[0].branchName,
            faculty: this.editFaculty[0]
          });
        }

      });
    });
  }

  ngOnInit(): void {
    if(this.editCurrentStudentData.email == ""){
      this.buildForm();
      this._service.getDepartmentdata().subscribe(res => {
        this.branchesList = res.response;
        this.branches = this.branchesList.map((a: any) => { return a.departmentName });
      });
    }
  }

  buildForm() {
    console.log(this.regFlag);
    this.studentRegisterForm = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.pattern(FieldValidationPattern.EmailValidationPattern)]),
      password: new FormControl({ value: '', disabled: this.regFlag }, [Validators.required]),
      branch: new FormControl("", [Validators.required]),
      faculty : new FormControl("", [Validators.required])
    });
  }

  onBranchSelect(data:any){
    let getAllFaultites = [];
    this.studentFaculty =[];
    this.studentRegisterForm.controls['faculty'].patchValue('');
    this._service.getFacultyListdata().subscribe(res => {
      this.facultyList = res.response;
      if(this.facultyList != null && this.facultyList.length>0){
        getAllFaultites = this.facultyList.filter((item:any) => item.dept === data.target.value);
        this.studentFaculty = getAllFaultites.map((item:any) => item.userName);
      }
    });
  }

  onFacultySelect(data:any){

  }

  submit(){
     this.studentRegistration.firstName =  this.studentRegisterForm.get('firstName')?.value;
     this.studentRegistration.lastName =  this.studentRegisterForm.get('lastName')?.value;
     this.studentRegistration.userName = this.studentRegisterForm.get('firstName')?.value+" "+this.studentRegisterForm.get('lastName')?.value
     this.studentRegistration.email =  this.studentRegisterForm.get('email')?.value;
     this.studentRegistration.password =  this.studentRegisterForm.get('password')?.value;
     this.studentRegistration.branch =  this.studentRegisterForm.get('branch')?.value;
     this.studentRegistration.faculty =  this.studentRegisterForm.get('faculty')?.value;
     this._service.postStudent(this.studentRegistration).subscribe(res=>{
            if(res.response.toLowerCase() == "success"){
              this._toaster.Success("The new Student Added Successfully");
              this.studentFaculty =[];
              this.studentRegisterForm.reset();
              this.studentRegisterForm.controls['branch'].patchValue('');
              this.studentRegisterForm.controls['faculty'].patchValue('');
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
      }
     );
  }

  update(){
    this.studentRegistration  = this.studentRegisterForm.value;
    this.studentRegistration.userName = this.studentRegisterForm.get('firstName')?.value+" "+this.studentRegisterForm.get('lastName')?.value;
      this._service.updateStudentById(this.editCurrentStudentData.studentID,this.studentRegistration).subscribe(res =>{
             if(res.response.toLowerCase() == "success"){
              this.studentFaculty = [];
              this._toaster.Success("Updated Successfully");
              this.studentRegisterForm.reset();
              this.studentRegisterForm.controls['branch'].patchValue('');
              this.studentRegisterForm.controls['faculty'].patchValue('');
             }
             else{
              this._toaster.Error("Something Went Wrong");
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
      }
      );
  }

  close(){
     this.registerStuObj.isAddFacultyClicked = false;
     this.registerStuObj.isAddStudentClicked = false;
     this.registerStuObj.isEditFacultyClicked = false;
     this.registerStuObj.isFacultylistClicked = false;
     this.registerStuObj.isRegitrtionPageClicked = false;
     this.registerStuObj.isStudentlistClicked = false;
     this.registerStuObj.isEditStudentClicked = false;
     this.regStuDataEvent.emit(this.registerStuObj);
  }
}
