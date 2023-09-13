import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateEnrollmentComponent } from './add-update-enrollment.component';

describe('AddUpdateEnrollmentComponent', () => {
  let component: AddUpdateEnrollmentComponent;
  let fixture: ComponentFixture<AddUpdateEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateEnrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
