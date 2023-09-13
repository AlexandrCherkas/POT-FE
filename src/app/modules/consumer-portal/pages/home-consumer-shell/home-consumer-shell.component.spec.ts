import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConsumerShellComponent } from './home-consumer-shell.component';

describe('HomeConsumerShellComponent', () => {
  let component: HomeConsumerShellComponent;
  let fixture: ComponentFixture<HomeConsumerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeConsumerShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeConsumerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
