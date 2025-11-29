import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenExtraInfoComponent } from './citizen-extra-info.component';

describe('CitizenExtraInfoComponent', () => {
  let component: CitizenExtraInfoComponent;
  let fixture: ComponentFixture<CitizenExtraInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenExtraInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenExtraInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
