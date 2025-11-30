import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrBasicInfoComponent } from './corporate-ir-basic-info.component';

describe('CorporateIrBasicInfoComponent', () => {
  let component: CorporateIrBasicInfoComponent;
  let fixture: ComponentFixture<CorporateIrBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrBasicInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
