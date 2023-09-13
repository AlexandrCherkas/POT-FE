import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEmployerComponent } from './add-new-employer.component';

describe('AddNewEmployerComponent', () => {
  let component: AddNewEmployerComponent;
  let fixture: ComponentFixture<AddNewEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
