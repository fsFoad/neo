import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBasicInfoComponent } from './corporate-basic-info.component';

describe('CorporateBasicInfoComponent', () => {
  let component: CorporateBasicInfoComponent;
  let fixture: ComponentFixture<CorporateBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateBasicInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
