import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrSignatureInfoComponent } from './citizen-fr-signature-info.component';

describe('CorporateSignatureInfoComponent', () => {
  let component: CitizenFrSignatureInfoComponent;
  let fixture: ComponentFixture<CitizenFrSignatureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrSignatureInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrSignatureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
