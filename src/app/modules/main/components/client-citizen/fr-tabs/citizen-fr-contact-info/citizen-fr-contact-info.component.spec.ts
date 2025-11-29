import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrContactInfoComponent } from './citizen-fr-contact-info.component';

describe('CorporateContactInfoComponent', () => {
  let component: CitizenFrContactInfoComponent;
  let fixture: ComponentFixture<CitizenFrContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
