import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmployersComponent } from './search-employers.component';

describe('SearchEmployerComponent', () => {
  let component: SearchEmployersComponent;
  let fixture: ComponentFixture<SearchEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEmployersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
