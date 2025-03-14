import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  // Importa el servicio AuthService
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { IonGrid, IonRow, IonCol, IonButton, IonLabel, IonInput, IonContent, IonIcon } from '@ionic/angular/standalone'; // Ionic standalone imports
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
  standalone: true,
  imports: [IonIcon,
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
  name: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    addIcons({eye})
  }




  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.email || !this.password) {
      alert('Por favor ingresa tus credenciales');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);

        // Guarda el accessToken y el rol en localStorage
        this.authService.setToken(response.accessToken);  // Guarda solo el accessToken
        localStorage.setItem('role', response.role); // Guarda el rol del usuario

        // Redirigir a la página correcta según el rol
        if (response.role === 'hospital') {
          this.router.navigate(['/home']); // Página para hospitales
        } else if (response.role === 'farmacia') {
          this.router.navigate(['/home']); // Página para farmacias
        } else {
          this.router.navigate(['/home']); // Página para usuarios generales
        }
      },
      error: (err) => {
        console.error('Error de login', err);
        alert('Credenciales incorrectas o error al iniciar sesión.');
      }
    });
  }

}
