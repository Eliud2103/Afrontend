import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { IonCard, IonCardHeader,IonSearchbar, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonItem, IonLabel, IonList, IonMenu, IonCardContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonCardContent,
    IonSearchbar,
    CommonModule

  ]
})
export class NavbarComponent implements OnInit {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.isScrolled = scrollTop > 50; // Oculta si el scroll es mayor a 50px
  }

  isAuthenticated: boolean = false; // Propiedad para verificar autenticación

  constructor(private authService: AuthService) {}


  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const token = localStorage.getItem('authToken'); // Verifica si hay un token guardado
    this.isAuthenticated = !!token; // Convierte en booleano (true si hay token, false si no)
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authName');
    localStorage.removeItem('authEmail');
    this.isAuthenticated = false; // Actualiza el estado
  }
}
