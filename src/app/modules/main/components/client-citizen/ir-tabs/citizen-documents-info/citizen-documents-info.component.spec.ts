import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenDocumentsInfoComponent } from './citizen-documents-info.component';

describe('CorporateIrDocumentsInfoComponent', () => {
  let component: CitizenDocumentsInfoComponent;
  let fixture: ComponentFixture<CitizenDocumentsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenDocumentsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenDocumentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
