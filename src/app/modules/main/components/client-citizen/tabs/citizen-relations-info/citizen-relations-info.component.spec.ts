import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenRelationsInfoComponent } from './citizen-relations-info.component';

describe('CorporateRelationsInfoComponent', () => {
  let component: CitizenRelationsInfoComponent;
  let fixture: ComponentFixture<CitizenRelationsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenRelationsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenRelationsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
