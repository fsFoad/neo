import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDocumentsInfoComponent } from './product-documents-info.component';

describe('ProductDocumentsInfoComponent', () => {
  let component: ProductDocumentsInfoComponent;
  let fixture: ComponentFixture<ProductDocumentsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDocumentsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDocumentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
