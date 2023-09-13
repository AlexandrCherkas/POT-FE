import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployerShellComponent } from './add-employer-shell.component';

describe('AddEmployerShellComponent', () => {
  let component: AddEmployerShellComponent;
  let fixture: ComponentFixture<AddEmployerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployerShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
