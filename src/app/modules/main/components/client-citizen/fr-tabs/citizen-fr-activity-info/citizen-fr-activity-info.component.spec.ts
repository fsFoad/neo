import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrActivityInfoComponent } from './citizen-fr-activity-info.component';

describe('CorporateIrActivityInfoComponent', () => {
  let component: CitizenFrActivityInfoComponent;
  let fixture: ComponentFixture<CitizenFrActivityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrActivityInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrActivityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
