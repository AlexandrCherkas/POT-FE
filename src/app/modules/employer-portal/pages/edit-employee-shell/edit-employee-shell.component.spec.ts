import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeShellComponent } from './edit-employee-shell.component';

describe('EditEmployeeShellComponent', () => {
  let component: EditEmployeeShellComponent;
  let fixture: ComponentFixture<EditEmployeeShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
