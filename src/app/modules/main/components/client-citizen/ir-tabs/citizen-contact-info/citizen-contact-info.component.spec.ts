import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenContactInfoComponent } from './citizen-contact-info.component';

describe('CorporateIrContactInfoComponent', () => {
  let component: CitizenContactInfoComponent;
  let fixture: ComponentFixture<CitizenContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
