import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sharedmodel } from '../sharedmodel';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { ServicesService } from '../services.service';
import { ChangeDetectorRef } from '@angular/core';
import { Facultycreate } from '../models/facultycreate';
import { Facultylist } from '../models/facultylist';
import { SpinnerService } from '../spinner.service';
import { Observable } from 'rxjs';
import { FieldValidationPattern } from '../validationpatterns/FieldValidationPattern';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {
  registerForm!: FormGroup;
  userTypeList: Array<any> = [];
  registerobj = new Sharedmodel();
  facultyCreateobj: Facultycreate = new Facultycreate();
  facultyUpdateobj: Facultycreate = new Facultycreate();
  updateFacultyobj: Facultycreate = new Facultycreate();

  @Output() regdataEvent = new EventEmitter<Sharedmodel>();

  @Input() editFacultyData: any;
  @Input() editCommonData: any;

  dropdownCourseList: any[] = [];
  dropdownSubjectList: any[] = [];
  dropdownCourseSettings: IDropdownSettings = {};
  dropdownSubjectSettings: IDropdownSettings = {};

  deptList: Array<any> = [];
  departments: Array<any> = [];
  courses: Array<any> = [];
  subjects: Array<any> = [];
  deptDropDownSelectedItem: string | undefined;
  courseDropDownSelectedItem: string = "";
  subjectDropDownSelectedItem: string = "";
  previousCourseData: any = [];

  constructor(private formBuilder: FormBuilder, private router: Router,
    private _service: ServicesService, private cdr: ChangeDetectorRef, private spinnerservice: SpinnerService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.registerobj.isEditFacultyClicked = this.editCommonData.isEditFacultyClicked;
    this.buildForm();
    this.registerobj.isEditFacultyClicked = this.editCommonData.isEditFacultyClicked;
    this.updateFacultyobj.facultyId = changes['editFacultyData'].currentValue.facultyID;
    this.updateFacultyobj.firstName = changes['editFacultyData'].currentValue.firstName;
    this.updateFacultyobj.lastName = changes['editFacultyData'].currentValue.lastName;
    this.updateFacultyobj.userName = changes['editFacultyData'].currentValue.userName;
    this.updateFacultyobj.email = changes['editFacultyData'].currentValue.email;
    this.updateFacultyobj.password = changes['editFacultyData'].currentValue.password;
    this.updateFacultyobj.dept = changes['editFacultyData'].currentValue.dept;
    this.updateFacultyobj.courseRequests = changes['editFacultyData'].currentValue.courses;
    this.updateFacultyobj.subjectRequests = changes['editFacultyData'].currentValue.subjects;
    if (this.updateFacultyobj.dept != null) {
      this._service.getDepartmentdata().subscribe(res => {
        this.deptList = res.response;
        this.departments = this.deptList.map((a: any) => { return a.departmentName });
        if (this.updateFacultyobj.email != null && this.registerobj.isEditFacultyClicked) {
          this.registerForm.controls['firstName'].patchValue(this.updateFacultyobj.firstName);
          this.registerForm.controls['lastName'].patchValue(this.updateFacultyobj.lastName);
          this.registerForm.controls['email'].patchValue(this.updateFacultyobj.email);
          this.registerForm.controls['dept'].setValue(this.updateFacultyobj.dept);
          this.editFacultyChanges(this.updateFacultyobj,);
        }
      });
    }
  }


  editFacultyChanges(editdata: any) {
    if (this.updateFacultyobj.email != null) {
      this.dropdownCourseList = [];
      this.dropdownSubjectList = [];
      this.previousCourseData = [];
      let matchedDept: any[] = [];
      matchedDept = this.deptList.filter(x => x.departmentName === editdata.dept);
      this.courses = matchedDept[0].courses.map((a: any) => ({ item_id: a.courseId, item_text: a.courseName }));
      this.dropdownCourseList = this.courses;

      let courseNames: any[] = [];
      editdata.courseRequests.forEach((courseRequest: any) => {
        courseNames.push(courseRequest.courseName);
      });

      const matchedItem = this.courses.filter(item => courseNames.includes(item.item_text));

      this.registerForm.controls['courses'].setValue(matchedItem);

      let matchedCourses = editdata.courseRequests.flatMap((request: any) =>
        matchedDept[0].courses.filter((course: any) => course.courseName === request.courseName)
      );

      console.log(matchedCourses);

      this.dropdownSubjectList = [];

      let subjects = matchedCourses.flatMap((course: any) => course.subjects);
      let mappedlistsubjects = subjects.map((a: any) => ({ item_id: a.subjectId, item_text: a.subjectName }));
      this.dropdownSubjectList = mappedlistsubjects;

      const matchedSubjects = this.dropdownSubjectList.filter((item1: any) =>
        editdata.courseRequests.some((item2: any) =>
        Array.isArray(item2.subjects) && item2.subjects.some((subject: any) =>
            subject.subjectName === item1.item_text
          )
        )
      );
      this.registerForm.controls['subjects'].setValue(matchedSubjects);
    }
  }


  ngOnInit(): void {
    this._service.getDepartmentdata().subscribe(res => {
      this.deptList = res.response;
      this.departments = this.deptList.map((a: any) => { return a.departmentName });
    });

    this.dropdownCourseList = [];
    this.dropdownSubjectList = [];
    this.dropdownCourseSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };

    this.dropdownSubjectSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };

    if (this.updateFacultyobj.email == null) {
      this.buildForm();
    }

  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required,]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.pattern(FieldValidationPattern.EmailValidationPattern)]),
      password: new FormControl({ value: '', disabled: this.registerobj.isEditFacultyClicked }, [Validators.required]),
      dept: new FormControl("", [Validators.required]),
      courses: new FormControl("", [Validators.required]),
      subjects: new FormControl("", [Validators.required])
    });
  }

  isDepartmentSelect: boolean = false;
  onDepartmentSelect(selectedValue: any) {
    this.isDepartmentSelect = true;
    this.dropdownCourseList = [];
    this.dropdownSubjectList = [];
    this.previousCourseData = [];
    this.registerForm.get('courses')?.setValue('');
    this.registerForm.get('subjects')?.setValue('');
    let matchedDept = [];
    console.log('Selected value:', selectedValue.target.value);
    this.deptDropDownSelectedItem = "";
    this.deptDropDownSelectedItem = selectedValue.target.value;
    matchedDept = this.deptList.filter(x => x.departmentName === selectedValue.target.value);
    this.courses = matchedDept[0].courses.map((a: any) => ({ item_id: a.courseId, item_text: a.courseName }));
    this.dropdownCourseList = this.courses;
  }

  onCourseSelect(item: any) {
    if ((this.updateFacultyobj.email) != null && (this.isDepartmentSelect == false)) {
      this.deptDropDownSelectedItem = this.updateFacultyobj.dept;
    }
    this.courseDropDownSelectedItem = item;
    let matchedDept = [];
    let matchedCourses = [];
    this.dropdownSubjectList = [];
    matchedDept = this.deptList.filter(x => x.departmentName === this.deptDropDownSelectedItem);
    matchedCourses = matchedDept[0].courses.filter((y: any) => y.courseName === item.item_text);
    if (matchedCourses[0].subjects != null) {
      this.subjects = matchedCourses[0].subjects.map((a: any) => ({ item_id: a.subjectId, item_text: a.subjectName }));
    }
    this.dropdownSubjectList = [...this.subjects, ...this.previousCourseData]
    this.previousCourseData = this.dropdownSubjectList;
  }

  submit() {
    this.facultyCreateobj.firstName = this.registerForm.value.firstName;
    this.facultyCreateobj.lastName = this.registerForm.value.lastName;
    this.facultyCreateobj.userName = this.registerForm.value.firstName + " " + this.registerForm.value.lastName;
    this.facultyCreateobj.email = this.registerForm.value.email;
    this.facultyCreateobj.password = this.registerForm.value.password;
    this.facultyCreateobj.dept = this.registerForm.value.dept;

    this.facultyCreateobj.courseRequests = this.registerForm.value.courses.map((item: any) => {
      return {
        dept: this.facultyCreateobj.dept,
        courseName: item.item_text
      };
    });

    this.facultyCreateobj.subjectRequests = this.registerForm.value.subjects.map((subjitem: any) => {

      const filteredCourses = this.deptList.flatMap(department => department.courses.filter((course: any) =>
        course.subjects.some((subject: any) => subject.subjectName.toLowerCase() === subjitem.item_text.toLowerCase())))
        .map(course => course.courseName);

      return {
        courseName: filteredCourses.length > 0 ? filteredCourses[0] : null,
        subjectName: subjitem.item_text
      };
    });

    console.log(this.facultyCreateobj.subjectRequests);
    this._service.postFaculty(this.facultyCreateobj).subscribe(res => {
      if (res.response == "Success") {
        alert("Suceessfully new Faculty Created");
        this.registerForm.controls['firstName'].patchValue('');
        this.registerForm.controls['lastName'].patchValue('');
        this.registerForm.controls['email'].patchValue('');
        this.registerForm.controls['password'].patchValue('');
        this.registerForm.controls['dept'].patchValue('Select menu');
        let restcourse: any[] = [];
        this.dropdownCourseList =[...restcourse];
        this.registerForm.controls['courses'].setValue(this.dropdownCourseList);
  
        let restsubj: any[] = [];
        this.dropdownSubjectList =[...restsubj];
        this.registerForm.controls['subjects'].setValue(this.dropdownSubjectList);
      }
      else {
        alert("Something went Wrong");
      }
    });
  }

  update() {
    this.facultyUpdateobj.firstName = this.registerForm.value.firstName;
    this.facultyUpdateobj.lastName = this.registerForm.value.lastName;
    this.facultyUpdateobj.userName = this.registerForm.value.firstName + " " + this.registerForm.value.lastName;
    this.facultyUpdateobj.email = this.registerForm.value.email;
    this.facultyUpdateobj.dept = this.registerForm.value.dept;

    this.facultyUpdateobj.courseRequests = this.registerForm.value.courses.map((item: any) => {
      return {
        dept: this.facultyUpdateobj.dept,
        courseName: item.item_text
      };
    });

    this.facultyUpdateobj.subjectRequests = this.registerForm.value.subjects.map((subjitem: any) => {

      const filteredCourses = this.deptList.flatMap(department => department.courses.filter((course: any) =>
        course.subjects.some((subject: any) => subject.subjectName.toLowerCase() === subjitem.item_text.toLowerCase())))
        .map(course => course.courseName);

      return {
        courseName: filteredCourses.length > 0 ? filteredCourses[0] : null,
        subjectName: subjitem.item_text
      };
    });

    this._service.updateFacultyById(this.updateFacultyobj.facultyId,this.facultyUpdateobj).subscribe((res: any) => {
      console.log(res);
      this.registerForm.controls['firstName'].patchValue('');
      this.registerForm.controls['lastName'].patchValue('');
      this.registerForm.controls['email'].patchValue('');
      this.registerForm.controls['password'].patchValue('');
      this.registerForm.controls['dept'].patchValue('Select menu');
      let restcourse: any[] = [];
      this.dropdownCourseList =[...restcourse];
      this.registerForm.controls['courses'].setValue(this.dropdownCourseList);

      let restsubj: any[] = [];
      this.dropdownSubjectList =[...restsubj];
      this.registerForm.controls['subjects'].setValue(this.dropdownSubjectList);

    })
  }

  onUserTypeSelection(type: any) {
    this.registerobj.isAddStudentClicked = false;
  }

  close() {
    this.registerobj.isAddStudentClicked = false;
    this.registerobj.isAddFacultyClicked = false;
    this.registerobj.isEditFacultyClicked = false;
    this.regdataEvent.emit(this.registerobj);
  }

  onItemSubjectSelect(item: any) {

  }

  onItemCourseDeSelect(item: any) {
    if (this.updateFacultyobj.email != null && (this.isDepartmentSelect == false)) {
      this.deptDropDownSelectedItem = this.updateFacultyobj.dept;
    }
    let matchedDept = this.deptList.filter(x => x.departmentName === this.deptDropDownSelectedItem);
    let matchedCourses = matchedDept[0].courses.filter((y: any) => y.courseName === item.item_text);
    if (matchedCourses[0].subjects != null) {
      var subjects = matchedCourses[0].subjects.map((a: any) => ({ item_id: a.subjectId, item_text: a.subjectName }));
    }
    let selectedItems = this.registerForm.get('subjects')?.value;

    this.dropdownSubjectList = this.dropdownSubjectList.filter((item1: any) => !subjects.some((item2: any) => item1.item_id === item2.item_id && item1.item_text === item2.item_text));

    const matchedSubjects = selectedItems.filter((item2: any) => this.dropdownSubjectList.some(item1 => item1.item_id === item2.item_id));
    this.registerForm.controls['subjects'].setValue(matchedSubjects);

    this.previousCourseData = [];
  }

  onItemSubjectDeSelect(item: any) {

  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onUnSelectAll() {
    console.log('onUnSelectAll fires');
  }

}
