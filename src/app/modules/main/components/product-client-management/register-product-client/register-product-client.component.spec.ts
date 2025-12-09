import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProductClientComponent } from './register-product-client.component';

describe('RegisterProductClientComponent', () => {
  let component: RegisterProductClientComponent;
  let fixture: ComponentFixture<RegisterProductClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProductClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProductClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
