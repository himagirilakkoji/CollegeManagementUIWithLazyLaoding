import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentregComponent } from './studentreg.component';

describe('StudentregComponent', () => {
  let component: StudentregComponent;
  let fixture: ComponentFixture<StudentregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentregComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
