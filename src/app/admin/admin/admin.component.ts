import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginAdminAction } from 'src/app/loginAction';
import { Facultylist } from 'src/app/shared/models/facultylist';
import { ServicesService } from 'src/app/shared/services.service';
import { Sharedmodel } from 'src/app/shared/sharedmodel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  receivedData = new Sharedmodel();
  editCommonData = new Sharedmodel();
  editFacultyData = new Facultylist();
  
  sessiondata: string = "";

  constructor(private _service: ServicesService, private _store: Store<{ data: { data: string } }>) 
  {
     this.receiveData
  }

  ngOnInit() {
    this._store.select('data').subscribe(res => {
      this.sessiondata = res.data;
      console.log("admin ",this.sessiondata);
    })

  }

  receiveData(data: any) {
    this.receivedData = data;
  }

  receiveregData(data: any) {
    this.receivedData = data;
  }

  receiveStudentlistData(data: any) {
    this.receivedData = data;
  }

  receiveFacultylistData(data: any) {
    this.receivedData = data;
  }
  
  receiveCommonData(data : any){
    this.receivedData = data;
  }

  receiveEditFacutyData(data: any){
    if(data.email != null){
      this.editFacultyData = data;
      this.editCommonData.isAddFacultyClicked = false;
      this.editCommonData.isAddStudentClicked = false;
      this.editCommonData.isEditFacultyClicked = true;
      this.editCommonData.isFacultylistClicked = false;
      this.editCommonData.isStudentlistClicked = false;
    }
  }

  receiveStudentRegData(data:any){
     this.receivedData = data;
  }

  regStuDataEvent(data : any){
     this.receivedData = data
  } 

}
