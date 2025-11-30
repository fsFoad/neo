import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateIrDocumentsInfoComponent } from './corporate-ir-documents-info.component';

describe('CorporateIrDocumentsInfoComponent', () => {
  let component: CorporateIrDocumentsInfoComponent;
  let fixture: ComponentFixture<CorporateIrDocumentsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateIrDocumentsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateIrDocumentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
