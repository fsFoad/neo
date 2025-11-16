import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateActivityInfoComponent } from './corporate-activity-info.component';

describe('CorporateActivityInfoComponent', () => {
  let component: CorporateActivityInfoComponent;
  let fixture: ComponentFixture<CorporateActivityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateActivityInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateActivityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
