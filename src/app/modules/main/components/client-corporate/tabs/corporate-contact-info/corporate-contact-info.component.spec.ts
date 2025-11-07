import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateContactInfoComponent } from './corporate-contact-info.component';

describe('CorporateContactInfoComponent', () => {
  let component: CorporateContactInfoComponent;
  let fixture: ComponentFixture<CorporateContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
