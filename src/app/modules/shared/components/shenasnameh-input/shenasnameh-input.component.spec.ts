import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShenasnamehInputComponent } from './shenasnameh-input.component';

describe('ShenasnamehInputComponent', () => {
  let component: ShenasnamehInputComponent;
  let fixture: ComponentFixture<ShenasnamehInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShenasnamehInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShenasnamehInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
