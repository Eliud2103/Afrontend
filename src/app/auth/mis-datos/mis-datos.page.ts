import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonText, IonItem, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Router } from '@angular/router'; // Importar Router
import { HttpErrorResponse } from '@angular/common/http'; // Importar HttpErrorResponse
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss'],
  standalone: true,
  imports: [IonButton, IonRow, IonGrid, IonCol, IonCardContent, NavbarComponent, IonCardTitle, IonCardHeader, IonCard, IonList, IonItem, IonText, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MisDatosPage implements OnInit {
  user: any = {}; // Variable para almacenar los datos del usuario
  errorMessage: string = ''; // Para mostrar errores al usuario
  isAuthenticated: boolean = false; // Variable para verificar si el usuario está autenticado

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus(); // Verificar si el usuario está autenticado
    if (this.isAuthenticated) {
      this.getUserData(); // Si está autenticado, obtener los datos del usuario
    } else {
      this.router.navigate(['/login']); // Si no está autenticado, redirigir al login
    }
  }

  // Variable para controlar el estado de edición
  isEditing: boolean = false;

  // Función para alternar el modo de edición
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.saveChanges(); // Guardar los cambios cuando se termine de editar
    }
  }

  // Función para guardar los cambios (aquí puedes agregar lógica para enviar los datos a un backend)
  saveChanges() {
    console.log('Cambios guardados:', this.user);
    // Aquí puedes hacer una llamada HTTP para guardar los datos
  }
  // Verificar si el usuario está autenticado
  checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated(); // Usar el método isAuthenticated del AuthService
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']); // Redirige si no está autenticado
    }
  }

  // Método para obtener los datos del usuario
  getUserData() {
    const decodedToken = this.authService.getDecodedToken();

    if (decodedToken) {
      console.log('Datos del token decodificados:', decodedToken);
      this.user = {
        fullName: decodedToken.fullName || 'Sin nombre',
        email: decodedToken.email || 'Sin email',
        lastNameFather: decodedToken.lastNameFather || 'Sin apellido paterno',
        lastNameMother: decodedToken.lastNameMother || 'Sin apellido materno'
      };
      // Guardar en localStorage para futuras cargas
      localStorage.setItem('authName', this.user.fullName);
      localStorage.setItem('authLastNameFather', this.user.lastNameFather);
      localStorage.setItem('authLastNameMother', this.user.lastNameMother);
      localStorage.setItem('authEmail', this.user.email);
    } else {
      this.errorMessage = 'No se pudo obtener el token de autenticación';
      this.loadUserFromStorage(); // Cargar desde localStorage en caso de error
    }
  }

  // Cargar los datos del usuario desde localStorage en caso de error
  loadUserFromStorage() {
    this.user = {
      fullName: localStorage.getItem('authName'),
      email: localStorage.getItem('authEmail'),
      lastNameFather: localStorage.getItem('authLastNameFather')
    };
    console.log('Datos cargados desde localStorage:', this.user);
  }

  // Eliminar sesión
  logout() {
    localStorage.removeItem('authToken');  // Elimina el token de localStorage
    localStorage.removeItem('authName');   // Elimina el nombre del usuario
    localStorage.removeItem('authEmail');
    localStorage.removeItem('authLastNameFather');  // Elimina apellido paterno
    this.checkAuthStatus();  // Elimina la autenticación
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/home']); // Redirige al usuario a la página de login
  }
}
