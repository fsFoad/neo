import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSignatureInfoComponent } from './corporate-signature-info.component';

describe('CorporateSignatureInfoComponent', () => {
  let component: CorporateSignatureInfoComponent;
  let fixture: ComponentFixture<CorporateSignatureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateSignatureInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateSignatureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
