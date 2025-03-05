import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  // Importa el servicio AuthService
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { IonGrid, IonRow, IonCol, IonButton, IonLabel, IonInput, IonContent } from '@ionic/angular/standalone'; // Ionic standalone imports
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonLabel,
    IonInput,
    IonContent,
    FormsModule,
    NavbarFormsComponent
  ]
})
export class LoginFormPage implements OnInit {

  email: string = '';  // Variable para almacenar el email
  password: string = '';  // Variable para almacenar la contraseña

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  // Método para iniciar sesión
  login() {
    if (!this.email || !this.password) {
      alert('Por favor ingresa tus credenciales');
      return;
    }

    // Llamar al servicio de autenticación
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response); // Para depurar, puedes ver la respuesta aquí

        // Guardamos el token en localStorage
        this.authService.setToken(response.accessToken);

        // Redirigimos al Home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error de login', err);
        alert('Credenciales incorrectas o error al iniciar sesión.');
      }
    });
  }
}
