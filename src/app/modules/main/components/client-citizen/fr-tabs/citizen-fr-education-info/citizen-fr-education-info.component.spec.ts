import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrEducationInfoComponent } from './citizen-fr-education-info.component';

describe('CitizenFrEducationInfoComponent', () => {
  let component: CitizenFrEducationInfoComponent;
  let fixture: ComponentFixture<CitizenFrEducationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrEducationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrEducationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
