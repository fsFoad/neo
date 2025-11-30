import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenIdentityInfoComponent } from './citizen-identity-info.component';

describe('CitizenIdentityInfoComponent', () => {
  let component: CitizenIdentityInfoComponent;
  let fixture: ComponentFixture<CitizenIdentityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenIdentityInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenIdentityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
