import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrRelationsInfoComponent } from './corporate-ir-relations-info.component';

describe('CorporateIrRelationsInfoComponent', () => {
  let component: CorporateIrRelationsInfoComponent;
  let fixture: ComponentFixture<CorporateIrRelationsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrRelationsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrRelationsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
