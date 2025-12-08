import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCatalogMngComponent } from './media-catalog-mng.component';

describe('MediaCatalogMngComponent', () => {
  let component: MediaCatalogMngComponent;
  let fixture: ComponentFixture<MediaCatalogMngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCatalogMngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaCatalogMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
