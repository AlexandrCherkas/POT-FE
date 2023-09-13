import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminShellComponent } from './home-admin-shell.component';

describe('HomeAdminShellComponent', () => {
  let component: HomeAdminShellComponent;
  let fixture: ComponentFixture<HomeAdminShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdminShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdminShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
