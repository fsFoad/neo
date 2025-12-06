import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInformationRequestComponent } from './product-information-request.component';

describe('ProductInformationRequestComponent', () => {
  let component: ProductInformationRequestComponent;
  let fixture: ComponentFixture<ProductInformationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInformationRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInformationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
