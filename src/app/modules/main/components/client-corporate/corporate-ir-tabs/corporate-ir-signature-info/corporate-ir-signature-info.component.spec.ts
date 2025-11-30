import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrSignatureInfoComponent } from './corporate-ir-signature-info.component';

describe('CorporateIrSignatureInfoComponent', () => {
  let component: CorporateIrSignatureInfoComponent;
  let fixture: ComponentFixture<CorporateIrSignatureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrSignatureInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrSignatureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
