import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LonSubOperationComponent } from './lon-sub-operation.component';

describe('LonSubOperationComponent', () => {
  let component: LonSubOperationComponent;
  let fixture: ComponentFixture<LonSubOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LonSubOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LonSubOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
