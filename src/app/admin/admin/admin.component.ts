import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginAdminAction } from 'src/app/loginAction';
import { ServicesService } from 'src/app/shared/services.service';
import { Sharedmodel } from 'src/app/shared/sharedmodel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  receivedData = new Sharedmodel();
  sessiondata: string = "";
  constructor(private _service: ServicesService, private _store: Store<{ data: { data: string } }>) {

  }

  ngOnInit() {

    this._store.select('data').subscribe(res => {
      this.sessiondata = res.data;
      console.log("admin ",this.sessiondata);
    })
    // this._service.getRoleData().subscribe((res) => {
    //   //alert(res);
    // });
  }

  receiveData(data: any) {
    this.receivedData = data;
    //alert(this.receivedData?.isAddFacultyClicked)
  }

  receiveregData(data: any) {
    this.receivedData = data;
    //alert(this.receivedData?.isAddStudentClicked)
  }

  receiveStudentlistData(data: any) {
    this.receivedData = data;
  }

  receiveFacultylistData(data: any) {
    this.receivedData = data;
  }

}
