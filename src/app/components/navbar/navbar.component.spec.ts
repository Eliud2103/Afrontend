import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser'; // Import para seleccionar elementos

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Nuevas pruebas para el buscador ---
  it('should update searchQuery on input', () => {
    const searchBar = fixture.debugElement.query(By.css('ion-searchbar'));
    const mockEvent = { target: { value: 'hospital' } };
    
    component.handleSearch(mockEvent);
    expect(component.searchQuery).toBe('hospital');
  });

  it('should emit search event', () => {
    spyOn(console, 'log'); // Espiamos console.log
    
    const searchBar = fixture.debugElement.query(By.css('ion-searchbar'));
    const mockEvent = { target: { value: 'farmacia' } };
    
    component.handleSearch(mockEvent);
    expect(console.log).toHaveBeenCalledWith('Buscando:', 'farmacia');
  });
});