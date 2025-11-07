import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRelationsInfoComponent } from './corporate-relations-info.component';

describe('CorporateRelationsInfoComponent', () => {
  let component: CorporateRelationsInfoComponent;
  let fixture: ComponentFixture<CorporateRelationsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateRelationsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateRelationsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
