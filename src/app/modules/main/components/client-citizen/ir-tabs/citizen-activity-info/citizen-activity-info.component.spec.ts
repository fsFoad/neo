import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenActivityInfoComponent } from './citizen-activity-info.component';

describe('CorporateIrActivityInfoComponent', () => {
  let component: CitizenActivityInfoComponent;
  let fixture: ComponentFixture<CitizenActivityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenActivityInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenActivityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
