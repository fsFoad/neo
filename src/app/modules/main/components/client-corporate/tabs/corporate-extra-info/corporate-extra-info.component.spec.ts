import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateExtraInfoComponent } from './corporate-extra-info.component';

describe('CorporateExtraInfoComponent', () => {
  let component: CorporateExtraInfoComponent;
  let fixture: ComponentFixture<CorporateExtraInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateExtraInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateExtraInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
