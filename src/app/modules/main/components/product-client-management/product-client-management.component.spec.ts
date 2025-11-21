import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductClientManagementComponent } from './product-client-management.component';

describe('ProductClientManagementComponent', () => {
  let component: ProductClientManagementComponent;
  let fixture: ComponentFixture<ProductClientManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductClientManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductClientManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
