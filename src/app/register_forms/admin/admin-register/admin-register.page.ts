import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCol, IonGrid, IonRow, IonInput, IonIcon } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.page.html',
  styleUrls: ['./admin-register.page.scss'],
  standalone: true,
  imports: [
    SiTienesCuentaComponent,NavbarComponent, IonIcon, IonInput, IonRow, IonGrid, IonCol, IonLabel,
    IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    NavbarFormsComponent
  ]
})
export class AdminRegisterPage implements OnInit {
  password: string = '';
  showPassword: boolean = false;

  user = {
    fullName: '',
    lastNameFather: '',
    lastNameMother: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    addIcons({ eye });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.authService.adminRegister(this.user).subscribe({
      next: (res) => {
        console.log('Administrador registrado:', res);
        alert('Registro de administrador exitoso');

        // Limpiar formulario
        this.user = {
          fullName: '',
          lastNameFather: '',
          lastNameMother: '',
          email: '',
          password: '',
        };

        // Redirigir al login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar administrador:', err);
        alert('Error al registrar administrador');
      }
    });
  }
}
