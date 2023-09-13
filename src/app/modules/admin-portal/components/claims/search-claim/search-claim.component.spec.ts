import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClaimComponent } from './search-claim.component';

describe('SearchClaimComponent', () => {
  let component: SearchClaimComponent;
  let fixture: ComponentFixture<SearchClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
