import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenEducationInfoComponent } from './citizen-education-info.component';

describe('CitizenEducationInfoComponent', () => {
  let component: CitizenEducationInfoComponent;
  let fixture: ComponentFixture<CitizenEducationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenEducationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenEducationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
