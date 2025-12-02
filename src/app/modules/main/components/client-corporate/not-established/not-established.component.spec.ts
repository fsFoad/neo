import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEstablishedComponent } from './not-established.component';

describe('NotEstablishedComponent', () => {
  let component: NotEstablishedComponent;
  let fixture: ComponentFixture<NotEstablishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotEstablishedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotEstablishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
