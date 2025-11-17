import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCitizenComponent } from './client-citizen.component';

describe('ClientCitizenComponent', () => {
  let component: ClientCitizenComponent;
  let fixture: ComponentFixture<ClientCitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCitizenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
