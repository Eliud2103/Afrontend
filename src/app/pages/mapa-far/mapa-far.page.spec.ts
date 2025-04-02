import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaFarPage } from './mapa-far.page';

describe('MapaFarPage', () => {
  let component: MapaFarPage;
  let fixture: ComponentFixture<MapaFarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaFarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
