import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCol, IonGrid, IonRow, IonInput } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http'; // Importar HttpErrorResponse
import { Router } from '@angular/router';  // Asegúrate de importar Router

import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
  standalone: true,
  imports: [
    IonInput, IonRow, IonGrid, IonCol, IonLabel, IonButton, IonContent,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent
  ]
})
export class MiPerfilPage implements OnInit {
  user: any = {}; // Variable para almacenar los datos del usuario
  errorMessage: string = ''; // Para mostrar errores al usuario
  isAuthenticated: boolean = false; // Variable para verificar si el usuario está autenticado

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus(); // Verificar si el usuario está autenticado
    if (this.isAuthenticated) {
      this.getUserProfile(); // Si está autenticado, obtener el perfil
    } else {
      this.router.navigate(['/login']); // Si no está autenticado, redirigir al login
    }
  }

  // Verificar si el usuario está autenticado
  checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isAuthenticated = true; // El token está presente, el usuario está autenticado
    } else {
      this.isAuthenticated = false; // El token no está presente, no autenticado
    }
  }

  // Método para obtener el perfil del usuario
  async getUserProfile() {
    try {
      const response = await firstValueFrom(this.authService.getUserProfile());
      console.log('Perfil obtenido:', response);
      this.user = {
        fullName: response.fullName || 'Sin nombre',
        email: response.email || 'Sin email'
      };
      // Guardar en localStorage para futuras cargas
      localStorage.setItem('authName', this.user.fullName);
      localStorage.setItem('authEmail', this.user.email);
    } catch (error: unknown) {
      console.error('Error al obtener perfil', error);

      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.errorMessage = 'Token inválido o expirado. Por favor, inicie sesión nuevamente.';
        } else if (error.status === 404) {
          this.errorMessage = 'La ruta no se encuentra. Verifique la configuración del backend.';
        } else {
          this.errorMessage = 'Ocurrió un error desconocido. Intente nuevamente más tarde.';
        }
      } else {
        this.errorMessage = 'Error desconocido. Intente nuevamente más tarde.';
      }

      // Si hay error, cargar desde localStorage
      this.loadUserFromStorage();
    }
  }

  // Cargar el perfil desde localStorage en caso de error
  loadUserFromStorage() {
    this.user = {
      fullName: localStorage.getItem('authName'),
      email: localStorage.getItem('authEmail')
    };
    console.log('Perfil cargado desde localStorage:', this.user);
  }

  // Eliminar sesión
  logout() {
    localStorage.removeItem('authToken');  // Elimina el token de localStorage
    localStorage.removeItem('authName');   // Elimina el nombre del usuario
    localStorage.removeItem('authEmail');  // Elimina el email del usuario
    this.router.navigate(['/home']); // Redirige al usuario a la página de login
  }
}
