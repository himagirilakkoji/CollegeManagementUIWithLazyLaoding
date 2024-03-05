import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sharedmodel } from '../sharedmodel';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { ServicesService } from '../services.service';
import { ChangeDetectorRef } from '@angular/core';
import { Facultycreate } from '../models/facultycreate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userTypeList: Array<any> = [];
  registerobj = new Sharedmodel();
  facultyCreateobj: Facultycreate = new Facultycreate();

  @Output() regdataEvent = new EventEmitter<Sharedmodel>();

  dropdownCourseList: any;
  dropdownSubjectList: any;
  dropdownCourseSettings: IDropdownSettings = {};
  dropdownSubjectSettings: IDropdownSettings = {};

  deptList: Array<any>= [];
  departments:Array<any>= [];
  courses : Array<any> = [];
  subjects: Array<any> = [];
  deptDropDownSelectedItem : string = "";
  courseDropDownSelectedItem : string = "";
  subjectDropDownSelectedItem : string = "";
  previousCourseData:any = []; 
  
  constructor(private formBuilder: FormBuilder, private router: Router,
    private _service: ServicesService,private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this._service.getFacultydata().subscribe(res=>{
      this.deptList = res.response;
      this.departments = this.deptList.map((a: any) => { return a.departmentName });
    });


    this.dropdownCourseList = [];
    this.dropdownSubjectList = [];
    this.dropdownCourseSettings = {
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
    };

    this.dropdownSubjectSettings = {
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
    };

    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required,]),
      lastName:  new FormControl("", [Validators.required]),
      email:     new FormControl("", [Validators.required]),
      password:  new FormControl("", [Validators.required]),
      dept:      new FormControl("Select menu", [Validators.required]),
      courses:   new FormControl("", [Validators.required]),
      subjects:  new FormControl("", [Validators.required])
    });
  }

  onSelect(selectedValue: any) {
    this.dropdownCourseList =[];
    this.dropdownSubjectList =[];
    this.previousCourseData =[];
    this.registerForm.get('courses')?.setValue('');
    this.registerForm.get('subjects')?.setValue('');
    let matchedDept = [];
    console.log('Selected value:', selectedValue.target.value);
    this.deptDropDownSelectedItem = selectedValue.target.value;
    matchedDept = this.deptList.filter(x => x.departmentName === selectedValue.target.value);
    this.courses  = matchedDept[0].courses.map((a: any) => ({item_id: a.courseId, item_text: a.courseName }));
    this.dropdownCourseList = this.courses;
  }
  
  onItemFacultySelect(item: any) {
    this.courseDropDownSelectedItem = item;
    let matchedDept = [];
    let matchedCourses = [];
    this.dropdownSubjectList=[];
    matchedDept = this.deptList.filter(x => x.departmentName === this.deptDropDownSelectedItem);
    matchedCourses = matchedDept[0].courses.filter((y:any) =>y.courseName === item.item_text);
    if(matchedCourses[0].subjects != null){
      this.subjects  = matchedCourses[0].subjects.map((a: any) => ({item_id: a.subjectId, item_text: a.subjectName }));
    }
    this.dropdownSubjectList = [...this.subjects,...this.previousCourseData]
    this.previousCourseData = this.dropdownSubjectList;
  }

  Submit() {
    console.log(this.registerForm.value);
    this.facultyCreateobj.firstName = this.registerForm.value.firstName;
    this.facultyCreateobj.lastName = this.registerForm.value.lastName;
    this.facultyCreateobj.userName = this.registerForm.value.firstName+" "+this.registerForm.value.lastName;
    this.facultyCreateobj.email = this.registerForm.value.email;
    this.facultyCreateobj.password = this.registerForm.value.password;
    this.facultyCreateobj.dept = this.registerForm.value.dept;

    this.facultyCreateobj.courseRequests = this.registerForm.value.courses.map((item:any) => {
      return {
          courseName: item.item_text
      };
    });

    this.facultyCreateobj.subjectRequests = this.registerForm.value.subjects.map((item:any) => {
      return {
        subjectName : item.item_text
      };
    });

    this._service.postFaculty(this.facultyCreateobj).subscribe(res =>{
      if(res.response == "Success"){
          alert("Suceessfully new Faculty Created");
          // this.registerForm.get('courses')?.setValue('');
          // this.registerForm.get('subjects')?.setValue('');
          // this.registerForm.get('dept')?.setValue('Select menu');
      }
      else{
        alert("Something went Wrong");
      }
    });
  }

  onUserTypeSelection(type: any) {
    this.registerobj.isAddStudentClicked = false;
  }

  close() {
    this.registerobj.isAddStudentClicked = false;
    this.registerobj.isAddFacultyClicked = false;
    this.regdataEvent.emit(this.registerobj);
  }

  onItemSubjectSelect(item: any) {

  }

  onItemSubjectDeSelect(){
    
  }

  onItemDeSelect(item: any) {
    console.log('onItemDeSelect', item);
    let matchedDept = this.deptList.filter(x => x.departmentName === this.deptDropDownSelectedItem);
    let matchedCourses = matchedDept[0].courses.filter((y:any) =>y.courseName === item.item_text);
    if(matchedCourses[0].subjects != null){
      var subjects  = matchedCourses[0].subjects.map((a: any) => ({item_id: a.subjectId, item_text: a.subjectName }));
    }
    this.dropdownSubjectList =  this.dropdownSubjectList.filter((item1:any) => !subjects.some((item2:any) => item1.item_id === item2.item_id && item1.item_text === item2.item_text));
    this.previousCourseData = [];
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onUnSelectAll() {
    console.log('onUnSelectAll fires');
  }

}
