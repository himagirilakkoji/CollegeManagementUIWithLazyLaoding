import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmarksreportComponent } from './studentmarksreport.component';

describe('StudentmarksreportComponent', () => {
  let component: StudentmarksreportComponent;
  let fixture: ComponentFixture<StudentmarksreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentmarksreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentmarksreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
