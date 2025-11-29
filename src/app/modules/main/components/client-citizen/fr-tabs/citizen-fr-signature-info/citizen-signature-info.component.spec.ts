import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenSignatureInfoComponent } from './citizen-signature-info.component';

describe('CorporateSignatureInfoComponent', () => {
  let component: CitizenSignatureInfoComponent;
  let fixture: ComponentFixture<CitizenSignatureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenSignatureInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenSignatureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
