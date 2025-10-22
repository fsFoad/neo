import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LonProductComponent } from './lon-product.component';

describe('LonProductComponent', () => {
  let component: LonProductComponent;
  let fixture: ComponentFixture<LonProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LonProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LonProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
