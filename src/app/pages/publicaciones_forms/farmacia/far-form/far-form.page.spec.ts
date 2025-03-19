import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarFormPage } from './far-form.page';

describe('FarFormPage', () => {
  let component: FarFormPage;
  let fixture: ComponentFixture<FarFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FarFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
