import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCol, IonRow, IonGrid, IonInput, IonIcon } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.page.html',
  styleUrls: ['./cambio-pass.page.scss'],
  standalone: true,
  imports: [IonIcon,
    IonInput, IonGrid, IonRow, IonCol, IonLabel, IonButton, IonContent,
    IonHeader, IonTitle, IonToolbar, RouterLink, RouterLinkActive,
    CommonModule, FormsModule, NavbarComponent
  ]
})
export class CambioPassPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;





  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  user = { email: '' };
  passwords = { currentPassword: '', newPassword: '', confirmPassword: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    addIcons({eye})

    this.checkAuthStatus();

  }

  // Verifica si el usuario está autenticado y obtiene su perfil
  async checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    await this.getUserProfile();
  }

  // Obtiene el perfil del usuario
  async getUserProfile() {
    try {
      const response = await this.authService.getUserProfile().toPromise();
      this.user.email = response.email || 'Correo no disponible';
    } catch (error) {
      console.error('Error al obtener perfil', error);
      this.handleProfileError(error);
    }
  }

  // Manejo de errores al obtener el perfil
  handleProfileError(error: unknown) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Error al obtener el perfil.';
    }
  }

  // Método para cambiar la contraseña
  async changePassword() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validar que las contraseñas coincidan
    if (this.passwords.newPassword !== this.passwords.confirmPassword) {
      this.errorMessage = 'Las nuevas contraseñas no coinciden.';
      return;
    }

    // Validación adicional: contraseñas deben tener al menos 8 caracteres (ejemplo)
    if (this.passwords.newPassword.length < 8) {
      this.errorMessage = 'La nueva contraseña debe tener al menos 8 caracteres.';
      return;
    }

    try {
      // Llamar al servicio de cambio de contraseña
      const response = await this.authService.changePassword(
        this.user.email,
        this.passwords.currentPassword,
        this.passwords.newPassword
      )

      // Eliminar el token después de cambiar la contraseña
      localStorage.removeItem('authToken');

      alert("Contrasena cambiada con exito")

      // Limpiar los campos después del cambio exitoso
      this.passwords = { currentPassword: '', newPassword: '', confirmPassword: '' };

      // Redirigir al usuario a la página de inicio
      this.router.navigate(['/home']);

    } catch (error: unknown) {
      console.error('Error al cambiar contraseña', error);

      if (error instanceof HttpErrorResponse) {
        if (error.status === 400) {
          this.errorMessage = 'Contraseña actual incorrecta.';
        } else {
          this.errorMessage = 'Error al cambiar la contraseña. Intente más tarde.';
        }
      } else {
        this.errorMessage = 'Error desconocido.';
      }
    }
  }
}
