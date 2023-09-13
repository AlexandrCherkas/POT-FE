import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployerShellComponent } from './edit-employer-shell.component';

describe('EditEmployerShellComponent', () => {
  let component: EditEmployerShellComponent;
  let fixture: ComponentFixture<EditEmployerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployerShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
