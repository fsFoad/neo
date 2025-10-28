import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCollateralInfoComponentComponent } from './product-collateral-info-component.component';

describe('ProductCollateralInfoComponentComponent', () => {
  let component: ProductCollateralInfoComponentComponent;
  let fixture: ComponentFixture<ProductCollateralInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCollateralInfoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCollateralInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
