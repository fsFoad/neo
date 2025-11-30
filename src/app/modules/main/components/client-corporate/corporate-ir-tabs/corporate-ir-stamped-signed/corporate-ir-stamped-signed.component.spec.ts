import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrStampedSignedComponent } from './corporate-ir-stamped-signed.component';

describe('CorporateIrStampedSignedComponent', () => {
  let component: CorporateIrStampedSignedComponent;
  let fixture: ComponentFixture<CorporateIrStampedSignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrStampedSignedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrStampedSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
