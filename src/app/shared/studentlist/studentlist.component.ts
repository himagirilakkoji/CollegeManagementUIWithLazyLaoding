import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { StudentMarks, Studentlist } from '../models/studentlist';
import { Sharedmodel } from '../sharedmodel';
import { Studentregistration } from '../models/Studentregistration';
import { NotificationtoasterService } from '../notificationtoaster.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit, OnChanges {
  allstudents: Studentlist[] = [];
  allstudentMarks : StudentMarks[] = [];
  @Output() studentEditEvent = new EventEmitter<{ commondata: Sharedmodel, currentStudent: Studentlist }>();
  @Output() studentReportEvent = new EventEmitter<{ studentUser: Studentlist, commondata: Sharedmodel, StudentmarksReport: StudentMarks[] }>();


  constructor(private formBuilder: FormBuilder, private router: Router, private _service: ServicesService,private _toaster:NotificationtoasterService) {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this._service.getStudentListdata().subscribe(res => {
      if(res.length >0){
        this._toaster.Success("Loading...");
      }
      else{
        this._toaster.Error("Not Found");
      }
      this.allstudents = res;
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

  editUser(data: any) {
    let studentObj = new Sharedmodel();
    studentObj.isEditStudentClicked = true;
    this.studentEditEvent.emit({ commondata: studentObj, currentStudent: data });
  }

  deleteUser(user: any) {
    //delete currentstudent
    this._service.deleteStudentById(user.studentID).subscribe(res => {
      if (res.response.toLowerCase() == "success") {
        this._toaster.Success("Successfully deleted");
        this._service.getStudentListdata().subscribe(res => {
          this.allstudents = res;
        });
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
    });
  }

  showStudentReport(user: any) {
    let studentObj = new Sharedmodel();
    studentObj.isStudentReportClicked = true;
    this._service.getStudentMarksById(user.studentID).subscribe(res=>{
        if(res.length>0){
          this.allstudentMarks = res;
          this.studentReportEvent.emit({ studentUser: user, commondata: studentObj, StudentmarksReport: this.allstudentMarks });
        }
    });


  }

}
