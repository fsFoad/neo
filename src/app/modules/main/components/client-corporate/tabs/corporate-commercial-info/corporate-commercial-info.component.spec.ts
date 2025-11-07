import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCommercialInfoComponent } from './corporate-commercial-info.component';

describe('CorporateCommercialInfoComponent', () => {
  let component: CorporateCommercialInfoComponent;
  let fixture: ComponentFixture<CorporateCommercialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateCommercialInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateCommercialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
