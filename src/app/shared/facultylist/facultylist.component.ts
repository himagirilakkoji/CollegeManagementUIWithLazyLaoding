import { Component, OnInit } from '@angular/core';
import { Facultylist } from '../models/facultylist';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-facultylist',
  templateUrl: './facultylist.component.html',
  styleUrls: ['./facultylist.component.scss']
})
export class FacultylistComponent implements OnInit {
  allfaculties : Facultylist[] = [];
  constructor(private service : ServicesService){

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
          this.service.getFacultyListdata().subscribe(res => {
            this.allfaculties = res.response;
            });
        }
       });
  }

}
