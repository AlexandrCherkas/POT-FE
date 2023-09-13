import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsShellComponent } from './enrollments-shell.component';

describe('EnrollmentsShellComponent', () => {
  let component: EnrollmentsShellComponent;
  let fixture: ComponentFixture<EnrollmentsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentsShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
