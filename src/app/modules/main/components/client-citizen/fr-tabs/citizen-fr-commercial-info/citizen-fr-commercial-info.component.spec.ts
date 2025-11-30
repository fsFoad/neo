import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrCommercialInfoComponent } from './citizen-fr-commercial-info.component';

describe('CorporateIrCommercialInfoComponent', () => {
  let component: CitizenFrCommercialInfoComponent;
  let fixture: ComponentFixture<CitizenFrCommercialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrCommercialInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrCommercialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
