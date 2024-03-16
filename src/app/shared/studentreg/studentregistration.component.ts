import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { Sharedmodel } from 'src/app/shared/sharedmodel';
import { Facultylist } from 'src/app/shared/models/facultylist';
import { StudentFaculty, Studentregistration } from '../models/Studentregistration';
import { NotificationtoasterService } from '../notificationtoaster.service';
import { FieldValidationPattern } from '../validationpatterns/FieldValidationPattern';


@Component({
  selector: 'app-studentregistration',
  templateUrl: './studentregistration.component.html',
  styleUrls: ['./studentregistration.component.scss']
})
export class StudentRegistrationComponent {
  studentRegisterForm!: FormGroup;
  branches: Array<any> = [];
  branchesList: Array<any> = [];
  facultyList : Facultylist[] = [];
  studentFaculty : Array<StudentFaculty> = [];
  registerStuObj = new Sharedmodel();
  studentRegistration = new Studentregistration();

  @Output() regStuDataEvent = new EventEmitter<Sharedmodel>();

  constructor(private formBuilder: FormBuilder,private _service: ServicesService,private _toaster:NotificationtoasterService){

  }

  ngOnInit(): void {
    this.buildForm();
    this._service.getDepartmentdata().subscribe(res => {
      this.branchesList = res.response;
      this.branches = this.branchesList.map((a: any) => { return a.departmentName });
    });
  }

  buildForm() {
    this.studentRegisterForm = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required,]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.pattern(FieldValidationPattern.EmailValidationPattern)]),
      password: new FormControl("", [Validators.required]),
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
    return null;
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
              this.studentRegisterForm.controls['firstName'].patchValue('');
              this.studentRegisterForm.controls['lastName'].patchValue('');
              this.studentRegisterForm.controls['email'].patchValue('');
              this.studentRegisterForm.controls['password'].patchValue('');
              this.studentRegisterForm.controls['branch'].patchValue('Select menu');
              this.studentRegisterForm.controls['faculty'].patchValue('Select menu');

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
     this.regStuDataEvent.emit(this.registerStuObj);
  }
}
