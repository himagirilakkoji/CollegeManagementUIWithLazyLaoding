import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { Facultylist } from '../models/facultylist';
import { ServicesService } from '../services.service';
import { Sharedmodel } from '../sharedmodel';
import { SpinnerService } from '../spinner.service';
import { NotificationtoasterService } from '../notificationtoaster.service';

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

  page:number = 1;
  itemsPerPage = 2;
  pageSize = 10;
  constructor(private service : ServicesService, private spinnerservice: SpinnerService,private toaster:NotificationtoasterService){

  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngOnInit(): void {
        //get faculty data
     this.service.getFacultyListdataByPagination(this.page,this.itemsPerPage).subscribe(res => {
          this.allfaculties = res.response;
          if(this.allfaculties.length>0){
            this.toaster.Success("Records loading...");
          }
          else{
            this.toaster.Error("Not Found");
          }
     },
     (error) => {
       if (error.status === 401) {
         this.toaster.Error("Unauthorized");
       } else if (error.status === 404) {
         this.toaster.Error("Not Found");
       } else if (error.status === 500) {
         this.toaster.Error("Internal Server Error");
       } else {
         this.toaster.Error("An error occurred");
       }
     });
  }

  deleteUser(data :any){
       //delete currentfaculty
       this.service.deleteFacultyById(data.facultyID).subscribe(res => {
        if(res.response == "Success"){
          //alert("Suceessfully Faculty Deleted");
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
    this.toaster.Success("loaded")
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

  handlePageChange(event:any){
    this.page = event;
            //get faculty data
            this.service.getFacultyListdataByPagination(this.page,this.itemsPerPage).subscribe(res => {
              this.allfaculties = res.response;
              if(this.allfaculties.length>0){
                this.toaster.Success("Records loading...");
              }
              else{
                this.allfaculties =[];
                this.toaster.Error("Not Found");
              }
         },
         (error) => {
           if (error.status === 401) {
             this.allfaculties =[];
             this.toaster.Error("Unauthorized");
           } else if (error.status === 404) {
             this.allfaculties =[];
             this.toaster.Error("Not Found");
           } else if (error.status === 500) {
             this.allfaculties =[];
             this.toaster.Error("Internal Server Error");
           } else {
             this.allfaculties =[];
             this.toaster.Error("An error occurred");
           }
         });
  }

}
