import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDocumentsInfoComponent } from './corporate-documents-info.component';

describe('CorporateDocumentsInfoComponent', () => {
  let component: CorporateDocumentsInfoComponent;
  let fixture: ComponentFixture<CorporateDocumentsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateDocumentsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateDocumentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
