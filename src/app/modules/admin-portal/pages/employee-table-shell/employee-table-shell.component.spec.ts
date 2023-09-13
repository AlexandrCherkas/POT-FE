import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTableShellComponent } from './employee-table-shell.component';

describe('EmployeeTableShellComponent', () => {
  let component: EmployeeTableShellComponent;
  let fixture: ComponentFixture<EmployeeTableShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTableShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTableShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
