import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarPublicacionPage } from './far-publicacion.page';

describe('FarPublicacionPage', () => {
  let component: FarPublicacionPage;
  let fixture: ComponentFixture<FarPublicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
