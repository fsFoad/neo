import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LonManagementComponent } from './lon-management.component';

describe('LonManagementComponent', () => {
  let component: LonManagementComponent;
  let fixture: ComponentFixture<LonManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LonManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LonManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
