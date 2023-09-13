import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPageMenuComponent } from './administration-page-menu.component';

describe('AdministrationPageMenuComponent', () => {
  let component: AdministrationPageMenuComponent;
  let fixture: ComponentFixture<AdministrationPageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationPageMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
