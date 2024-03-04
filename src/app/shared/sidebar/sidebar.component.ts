import { Component, EventEmitter, Output } from '@angular/core';
import { ServicesService } from '../services.service';
import { Sharedmodel } from '../sharedmodel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() dataEvent = new EventEmitter<Sharedmodel>();
  adminbarbj = new Sharedmodel();

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
    this.service.getFacultydata().subscribe(res => {});
      //get faculty data
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
    this.service.getFacultydata().subscribe(res => {});
      //get faculty data
  }

}
