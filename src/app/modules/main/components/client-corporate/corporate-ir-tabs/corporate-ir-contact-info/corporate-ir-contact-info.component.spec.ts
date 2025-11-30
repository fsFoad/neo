import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrContactInfoComponent } from './corporate-ir-contact-info.component';

describe('CorporateIrContactInfoComponent', () => {
  let component: CorporateIrContactInfoComponent;
  let fixture: ComponentFixture<CorporateIrContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
