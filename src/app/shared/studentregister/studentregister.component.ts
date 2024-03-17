import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.scss']
})
export class StudentregisterComponent {
  dropdownList: any;
  dropdownSettings: IDropdownSettings = {};
  registerForm!: FormGroup;
  userTypeList: { code: number; name: string; }[];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.userTypeList = [
      { code: 2, name: "Faculty" },
      { code: 3, name: "Student" }
    ]
  }

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Item1' },
      { item_id: 2, item_text: 'Item2' },
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' },
      { item_id: 5, item_text: 'Item5' }
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      //enableCheckAll: false,
      //allowSearchFilter: true
    };
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required,]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      roles: new FormControl("", [Validators.required,]),
      password: new FormControl("", [Validators.required,]),
      myItems: new FormControl("", [Validators.required,])
    });
  }

  Save() {
    var cc =  this.registerForm.get("myItems")?.value
    console.log(cc);
     //this.router.navigateByUrl('/login');
   }

   close() {
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {
    console.log('onItemDeSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onUnSelectAll() {
    console.log('onUnSelectAll fires');
  }
}
