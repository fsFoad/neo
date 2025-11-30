import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrRelationsInfoComponent } from './citizen-fr-relations-info.component';

describe('CorporateIrRelationsInfoComponent', () => {
  let component: CitizenFrRelationsInfoComponent;
  let fixture: ComponentFixture<CitizenFrRelationsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrRelationsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrRelationsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
