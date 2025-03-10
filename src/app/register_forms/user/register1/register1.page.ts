import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonCol, IonGrid, IonRow, IonInput, IonIcon } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { AuthService } from 'src/app/services/auth.service';  // Importa AuthService
import { Router } from '@angular/router';  // Importa Router para redirección
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.page.html',
  styleUrls: ['./register1.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonRow, IonGrid, IonCol, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarFormsComponent]
})
export class Register1Page implements OnInit {
  password: string = '';
  showPassword: boolean = false;
  // Datos del formulario
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  user = {
    fullName: '',
    lastNameFather: '',
    lastNameMother: '',
    email: '',
    password: ''
  };

  // Inyectar AuthService y Router
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    addIcons({eye})
   }

  // Método para registrar al usuario
  register() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        console.log('Usuario registrado:', res);
        alert('Registro exitoso');

        // Limpiar los campos del formulario
        this.user = {
          fullName: '',
          lastNameFather: '',
          lastNameMother: '',
          email: '',
          password: ''
        };

        // Redirigir al login después del registro exitoso
        this.router.navigate(['/login']);  // Asegúrate de que la ruta '/login' esté definida en tu enrutador
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar usuario');
      }
    });
  }
}
