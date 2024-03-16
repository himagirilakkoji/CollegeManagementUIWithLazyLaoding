import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { Sharedmodel } from 'src/app/shared/sharedmodel';
import { StudentFaculty, Studentregistration } from '../../models/studentregistration';
import { Facultylist } from 'src/app/shared/models/facultylist';

@Component({
  selector: 'app-studentreg',
  templateUrl: './studentreg.component.html',
  styleUrls: ['./studentreg.component.scss']
})
export class StudentregComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // studentRegisterForm!: FormGroup;
  // branches: Array<any> = [];
  // branchesList: Array<any> = [];
  // facultyList : Facultylist[] = [];
  // studentFaculty : Array<StudentFaculty> = [];
  // registerStuObj = new Sharedmodel();
  // studentRegistration = new Studentregistration();

  // @Output() regStuDataEvent = new EventEmitter<Sharedmodel>();

  // constructor(private formBuilder: FormBuilder,private _service: ServicesService){

  // }

  // ngOnInit(): void {
  //   this.buildForm();
  //   this._service.getDepartmentdata().subscribe(res => {
  //     this.branchesList = res.response;
  //     this.branches = this.branchesList.map((a: any) => { return a.departmentName });
  //   });
  // }

  // buildForm() {
  //   this.studentRegisterForm = this.formBuilder.group({
  //     firstName: new FormControl("", [Validators.required,]),
  //     lastName: new FormControl("", [Validators.required]),
  //     email: new FormControl("", [Validators.required]),
  //     password: new FormControl("", [Validators.required]),
  //     branch: new FormControl("Select menu", [Validators.required]),
  //     faculty : new FormControl("Select menu", [Validators.required])
  //   });
  // }

  // onBranchSelect(data:any){
  //   let getAllFaultites = [];
  //   this.studentFaculty =[];
  //   this.studentRegisterForm.controls['faculty'].patchValue('Select menu');
  //   this._service.getFacultyListdata().subscribe(res => {
  //     this.facultyList = res.response;
  //     if(this.facultyList != null && this.facultyList.length>0){
  //       getAllFaultites = this.facultyList.filter((item:any) => item.dept === data.target.value);
  //       this.studentFaculty = getAllFaultites.map((item:any) => item.userName);
  //     }
  //   });
  // }

  // onFacultySelect(data:any){

  // }

  // submit(){
  //    this.studentRegistration.firstName =  this.studentRegisterForm.get('firstName')?.value;
  //    this.studentRegistration.lastName =  this.studentRegisterForm.get('lastName')?.value;
  //    this.studentRegistration.userName = this.studentRegisterForm.get('firstName')?.value+" "+this.studentRegisterForm.get('lastName')?.value
  //    this.studentRegistration.email =  this.studentRegisterForm.get('email')?.value;
  //    this.studentRegistration.password =  this.studentRegisterForm.get('password')?.value;
  //    this.studentRegistration.branch =  this.studentRegisterForm.get('branch')?.value;
  //    this.studentRegistration.faculty =  this.studentRegisterForm.get('faculty')?.value;
  //    this._service.postStudent(this.studentRegistration).subscribe(res=>{
  //           if(res.response.toLowerCase() == "success"){
  //             alert("The new Student Added Successfully");
  //             this.studentFaculty =[];
  //             this.studentRegisterForm.controls['firstName'].patchValue('');
  //             this.studentRegisterForm.controls['lastName'].patchValue('');
  //             this.studentRegisterForm.controls['email'].patchValue('');
  //             this.studentRegisterForm.controls['password'].patchValue('');
  //             this.studentRegisterForm.controls['branch'].patchValue('Select menu');
  //             this.studentRegisterForm.controls['faculty'].patchValue('Select menu');

  //           }
  //    });
  // }

  // close(){
  //    this.registerStuObj.isAddFacultyClicked = false;
  //    this.registerStuObj.isAddStudentClicked = false;
  //    this.registerStuObj.isEditFacultyClicked = false;
  //    this.registerStuObj.isFacultylistClicked = false;
  //    this.registerStuObj.isRegitrtionPageClicked = false;
  //    this.registerStuObj.isStudentlistClicked = false;
  //    this.regStuDataEvent.emit(this.registerStuObj);
  // }

}
