import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPublicacionPage } from './detail-publicacion.page';

describe('DetailPublicacionPage', () => {
  let component: DetailPublicacionPage;
  let fixture: ComponentFixture<DetailPublicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
