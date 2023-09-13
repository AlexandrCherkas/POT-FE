import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEmployerShellComponent } from './home-employer-shell.component';

describe('HomeEmployerShellComponent', () => {
  let component: HomeEmployerShellComponent;
  let fixture: ComponentFixture<HomeEmployerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEmployerShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEmployerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
