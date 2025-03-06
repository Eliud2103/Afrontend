// mi-perfil.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCol, IonGrid, IonRow, IonInput } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    const token = this.authService.getToken(); // Método para obtener el token
    console.log('Token obtenido:', token);

    if (!token) {
      this.errorMessage = 'No se ha encontrado un token válido. Por favor, inicie sesión.';
      return;
    }

    this.http
      .get(`${environment.apiUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe(
        (response: any) => {
          this.user = response; // Guardamos los datos del usuario
        },
        (error) => {
          console.error('Error al obtener perfil', error);
          if (error.status === 401) {
            this.errorMessage = 'Token inválido o expirado. Por favor, inicie sesión nuevamente.';
          } else if (error.status === 404) {
            this.errorMessage = 'La ruta no se encuentra. Verifique la configuración del backend.';
          } else {
            this.errorMessage = 'Ocurrió un error desconocido. Intente nuevamente más tarde.';
          }
        }
      );
  }
}
