import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamstudentlevelreportComponent } from './examstudentlevelreport.component';

describe('ExamstudentlevelreportComponent', () => {
  let component: ExamstudentlevelreportComponent;
  let fixture: ComponentFixture<ExamstudentlevelreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamstudentlevelreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamstudentlevelreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
