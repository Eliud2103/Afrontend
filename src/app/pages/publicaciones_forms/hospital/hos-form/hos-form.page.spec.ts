import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HosFormPage } from './hos-form.page';

describe('HosFormPage', () => {
  let component: HosFormPage;
  let fixture: ComponentFixture<HosFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
