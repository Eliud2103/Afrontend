import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCol, IonGrid, IonRow, IonInput } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
  standalone: true,
  imports: [
    IonInput, IonRow, IonGrid, IonCol, IonLabel, IonButton, IonContent,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent, RouterLink, RouterLinkActive
  ]
})
export class MiPerfilPage implements OnInit {
  user: any = {}; // Variable para almacenar los datos del usuario
  errorMessage: string = ''; // Para mostrar errores al usuario
  isAuthenticated: boolean = false; // Variable para verificar si el usuario está autenticado
  userRole: string = ''; // Variable para almacenar el rol del usuario

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();
    if (this.isAuthenticated) {
      this.getUserProfile();
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Verificar si el usuario está autenticado
  checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  // Obtener el perfil del usuario desde el token
  getUserProfile() {
    const decodedToken = this.authService.getDecodedToken();

    if (decodedToken) {
      console.log('Datos del token decodificados:', decodedToken);

      this.user = {
        fullName: decodedToken.fullName || 'Sin nombre',
        email: decodedToken.email || 'Sin email',
        lastNameFather: decodedToken.lastNameFather || '',
        lastNameMother: decodedToken.lastNameMother || ''
      };

      this.userRole = decodedToken.role || '';

      // Guardar en localStorage para futuras cargas
      localStorage.setItem('authName', this.user.fullName);
      localStorage.setItem('authEmail', this.user.email);
      localStorage.setItem('authRole', this.userRole);

      // Solo guardar los apellidos si el rol NO es hospital o farmacia
      if (this.userRole !== 'hospital' && this.userRole !== 'farmacia') {
        localStorage.setItem('authLastNameFather', this.user.lastNameFather);
        localStorage.setItem('authLastNameMother', this.user.lastNameMother);
      }
    } else {
      this.errorMessage = 'No se pudo obtener el token de autenticación';
      this.loadUserFromStorage();
    }
  }

  // Cargar datos desde localStorage en caso de error
  loadUserFromStorage() {
    this.user = {
      fullName: localStorage.getItem('authName'),
      email: localStorage.getItem('authEmail'),
      lastNameFather: localStorage.getItem('authLastNameFather') || '',
      lastNameMother: localStorage.getItem('authLastNameMother') || ''
    };
    this.userRole = localStorage.getItem('authRole') || '';
    console.log('Perfil cargado desde localStorage:', this.user);
  }

  // Eliminar sesión
  logout() {
    localStorage.clear();
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/home']);
  }
}
