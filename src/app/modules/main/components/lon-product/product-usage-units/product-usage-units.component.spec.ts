import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUsageUnitsComponent } from './product-usage-units.component';

describe('ProductUsageUnitsComponent', () => {
  let component: ProductUsageUnitsComponent;
  let fixture: ComponentFixture<ProductUsageUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUsageUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUsageUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
