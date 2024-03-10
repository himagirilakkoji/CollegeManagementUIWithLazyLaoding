import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamreportComponent } from './examreport.component';

describe('ExamreportComponent', () => {
  let component: ExamreportComponent;
  let fixture: ComponentFixture<ExamreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
