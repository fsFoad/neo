import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenCommercialInfoComponent } from './citizen-commercial-info.component';

describe('CorporateCommercialInfoComponent', () => {
  let component: CitizenCommercialInfoComponent;
  let fixture: ComponentFixture<CitizenCommercialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenCommercialInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenCommercialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
