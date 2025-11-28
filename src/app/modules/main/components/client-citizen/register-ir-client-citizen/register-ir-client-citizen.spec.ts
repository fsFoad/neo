import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterIrClientCitizen } from './register-ir-client-citizen';

describe('RegisterIrClientCitizen', () => {
  let component: RegisterIrClientCitizen;
  let fixture: ComponentFixture<RegisterIrClientCitizen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterIrClientCitizen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterIrClientCitizen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
