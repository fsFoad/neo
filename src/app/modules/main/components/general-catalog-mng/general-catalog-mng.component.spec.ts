import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCatalogMngComponent } from './general-catalog-mng.component';

describe('GeneralCatalogMngComponent', () => {
  let component: GeneralCatalogMngComponent;
  let fixture: ComponentFixture<GeneralCatalogMngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralCatalogMngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralCatalogMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
