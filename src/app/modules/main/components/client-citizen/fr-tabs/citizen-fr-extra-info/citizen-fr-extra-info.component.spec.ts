import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrExtraInfoComponent } from './citizen-fr-extra-info.component';

describe('CitizenFrExtraInfoComponent', () => {
  let component: CitizenFrExtraInfoComponent;
  let fixture: ComponentFixture<CitizenFrExtraInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrExtraInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrExtraInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
