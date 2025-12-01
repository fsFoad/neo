import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInfoFormComponent } from './base-info-form.component';

describe('BaseInfoFormComponent', () => {
  let component: BaseInfoFormComponent;
  let fixture: ComponentFixture<BaseInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
