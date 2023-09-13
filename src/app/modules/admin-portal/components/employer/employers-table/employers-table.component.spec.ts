import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersTableComponent } from './employers-table.component';

describe('EmployersTableComponent', () => {
  let component: EmployersTableComponent;
  let fixture: ComponentFixture<EmployersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
