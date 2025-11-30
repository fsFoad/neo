import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrCommercialInfoComponent } from './corporate-ir-commercial-info.component';

describe('CorporateIrCommercialInfoComponent', () => {
  let component: CorporateIrCommercialInfoComponent;
  let fixture: ComponentFixture<CorporateIrCommercialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrCommercialInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrCommercialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
