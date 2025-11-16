import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGuestComponent } from './client-guest.component';

describe('ClientGuestComponent', () => {
  let component: ClientGuestComponent;
  let fixture: ComponentFixture<ClientGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
