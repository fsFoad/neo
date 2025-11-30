import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrDocumentsInfoComponent } from './citizen-fr-documents-info.component';

describe('CorporateIrDocumentsInfoComponent', () => {
  let component: CitizenFrDocumentsInfoComponent;
  let fixture: ComponentFixture<CitizenFrDocumentsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrDocumentsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrDocumentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
