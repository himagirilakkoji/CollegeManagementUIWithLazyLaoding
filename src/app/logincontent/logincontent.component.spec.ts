import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincontentComponent } from './logincontent.component';

describe('LogincontentComponent', () => {
  let component: LogincontentComponent;
  let fixture: ComponentFixture<LogincontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogincontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
