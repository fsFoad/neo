import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateralSelectorComponent } from './collateral-selector.component';

describe('CollateralSelectorComponent', () => {
  let component: CollateralSelectorComponent;
  let fixture: ComponentFixture<CollateralSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollateralSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollateralSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
