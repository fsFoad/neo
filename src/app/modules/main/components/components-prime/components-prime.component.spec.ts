import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPrimeComponent } from './components-prime.component';

describe('ComponentsPrimeComponent', () => {
  let component: ComponentsPrimeComponent;
  let fixture: ComponentFixture<ComponentsPrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsPrimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
