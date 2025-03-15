import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HosPublicacionPage } from './hos-publicacion.page';

describe('HosPublicacionPage', () => {
  let component: HosPublicacionPage;
  let fixture: ComponentFixture<HosPublicacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HosPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
