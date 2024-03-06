import { Component, EventEmitter, Output } from '@angular/core';
import { ServicesService } from '../services.service';
import { Sharedmodel } from '../sharedmodel';
import { Facultylist } from '../models/facultylist';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() dataEvent = new EventEmitter<Sharedmodel>();
  adminbarbj = new Sharedmodel();
  allfaculties = new Facultylist();

  constructor(private service : ServicesService){

  }

  addFaculty(){
    this.adminbarbj.isAddFacultyClicked = true;
    this.adminbarbj.isAddStudentClicked = false;
    this.adminbarbj.isFacultylistClicked = false;
    this.adminbarbj.isStudentlistClicked = false;
    this.dataEvent.emit(this.adminbarbj);
  }

  getFacultyList(){
    this.adminbarbj.isFacultylistClicked = true;
    this.adminbarbj.isStudentlistClicked = false;
    this.adminbarbj.isAddFacultyClicked = false;
    this.adminbarbj.isAddStudentClicked = false;
    this.dataEvent.emit(this.adminbarbj);
  }

  addStudent(){
    this.adminbarbj.isAddFacultyClicked = false;
    this.adminbarbj.isAddStudentClicked = true;
    this.adminbarbj.isFacultylistClicked = false;
    this.adminbarbj.isStudentlistClicked = false;
    this.dataEvent.emit(this.adminbarbj);
  }

  getStudentList(){
    this.adminbarbj.isFacultylistClicked = false;
    this.adminbarbj.isStudentlistClicked = true;
    this.adminbarbj.isAddFacultyClicked = false;
    this.adminbarbj.isAddStudentClicked = false;
    this.dataEvent.emit(this.adminbarbj);
  }

}
