import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeShellComponent } from './add-employee-shell.component';

describe('AddEmployeeShellComponent', () => {
  let component: AddEmployeeShellComponent;
  let fixture: ComponentFixture<AddEmployeeShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
