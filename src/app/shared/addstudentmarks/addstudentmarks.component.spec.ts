import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentmarksComponent } from './addstudentmarks.component';

describe('AddstudentmarksComponent', () => {
  let component: AddstudentmarksComponent;
  let fixture: ComponentFixture<AddstudentmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddstudentmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstudentmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
