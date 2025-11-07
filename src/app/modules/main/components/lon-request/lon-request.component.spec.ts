import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LonRequestComponent } from './lon-request.component';

describe('LonRequestComponent', () => {
  let component: LonRequestComponent;
  let fixture: ComponentFixture<LonRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LonRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LonRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
