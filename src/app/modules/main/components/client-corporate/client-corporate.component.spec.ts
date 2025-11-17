import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCorporateComponent } from './client-corporate.component';

describe('ClientCorporateComponent', () => {
  let component: ClientCorporateComponent;
  let fixture: ComponentFixture<ClientCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCorporateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
