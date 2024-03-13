import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { Facultylist } from '../models/facultylist';
import { ServicesService } from '../services.service';
import { Sharedmodel } from '../sharedmodel';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-facultylist',
  templateUrl: './facultylist.component.html',
  styleUrls: ['./facultylist.component.scss']
})
export class FacultylistComponent implements OnInit {
  allfaculties : Facultylist[] = [];
  facultyObj = new Sharedmodel();

  @Output() facultyEditEvent = new EventEmitter<Facultylist>();
  @Output() facultyEvent = new EventEmitter<Sharedmodel>();
  @Output() facultyReportEvent = new EventEmitter<{facultyUser:Facultylist,commondata :Sharedmodel,courselevelReport: any }>();


  constructor(private service : ServicesService, private spinnerservice: SpinnerService,){

  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngOnInit(): void {
        //get faculty data
     this.service.getFacultyListdata().subscribe(res => {
          this.allfaculties = res.response;
     });
  }

  deleteUser(data :any){
       //delete currentfaculty
       this.service.deleteFacultyById(data.facultyID).subscribe(res => {
        if(res.response == "Success"){
          alert("Suceessfully Faculty Deleted");
          this.service.getFacultyListdata().subscribe(res => {
            this.allfaculties = res.response;
            });
        }
       });
  }

  editUser(data:any){
      this.facultyObj.isAddStudentClicked = false;
      this.facultyObj.isAddFacultyClicked = false;
      this.facultyObj.isFacultylistClicked = false;
      this.facultyObj.isStudentlistClicked = false;
      this.facultyObj.isEditFacultyClicked = true;
      this.facultyEditEvent.emit(data);
      this.facultyEvent.emit(this.facultyObj);
  }

  showReport(data:any){
        this.facultyObj.isAddStudentClicked = false;
        this.facultyObj.isAddFacultyClicked = false;
        this.facultyObj.isFacultylistClicked = false;
        this.facultyObj.isStudentlistClicked = false;
        this.facultyObj.isFacultyReportClicked = true;
        this.facultyObj.isEditFacultyClicked = false;
        this.service.getCourseLevelReportById(data.facultyID).subscribe(res=>{
          this.facultyReportEvent.emit({ facultyUser: data, commondata:  this.facultyObj,courselevelReport: res });
        });
  }

}
