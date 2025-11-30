import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrExtraInfoComponent } from './corporate-ir-extra-info.component';

describe('CorporateIrExtraInfoComponent', () => {
  let component: CorporateIrExtraInfoComponent;
  let fixture: ComponentFixture<CorporateIrExtraInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrExtraInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrExtraInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
