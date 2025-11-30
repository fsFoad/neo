import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrActivityInfoComponent } from './corporate-ir-activity-info.component';

describe('CorporateIrActivityInfoComponent', () => {
  let component: CorporateIrActivityInfoComponent;
  let fixture: ComponentFixture<CorporateIrActivityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrActivityInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrActivityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
