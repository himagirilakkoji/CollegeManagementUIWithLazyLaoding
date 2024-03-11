import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { Studentlist } from '../models/studentlist';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit, OnChanges{
  allstudents : Studentlist[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router,private _service: ServicesService){

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
      this._service.getStudentListdata().subscribe(res => {
           this.allstudents = res;
           console.log(res);
      });
  }

  editUser(data:any){

  }

  deleteUser(user:any){
           //delete currentstudent
           this._service.deleteStudentById(user.studentID).subscribe(res => {
            if(res.response.toLowerCase() == "success"){
              alert("Successfully deleted");
              this._service.getStudentListdata().subscribe(res => {
                this.allstudents = res;
                });
            }
           });
  }

}
