import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { IonCard, IonCardHeader,IonBackButton, IonSearchbar, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonItem, IonLabel, IonList, IonMenu, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, exit } from 'ionicons/icons';
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
    CommonModule,
    IonBackButton


  ]
})
export class NavbarComponent implements OnInit {
  @Input() title!: string;
  isScrolled = false;
  isAuthenticated: boolean = false; // Verificar si el usuario está autenticado
  role: string = ''; // Variable para almacenar el rol del usuario

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.isScrolled = scrollTop > 50; // Oculta si el scroll es mayor a 50px
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {
    addIcons({arrowBack,exit})
    this.checkAuthentication();
  }

  // Verificar si el usuario está autenticado
  checkAuthentication() {
    const token = localStorage.getItem('authToken'); // Verifica si hay un token guardado
    this.isAuthenticated = !!token; // Convierte en booleano (true si hay token, false si no)

    if (this.isAuthenticated) {
      this.role = localStorage.getItem('role') || ''; // Obtén el rol del usuario desde localStorage
    }
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authName');
    localStorage.removeItem('authEmail');
    localStorage.removeItem('role'); // Eliminar el rol del usuario
    this.isAuthenticated = false; // Actualiza el estado de autenticación
    this.role = ''; // Restablecer el rol
  }
}
