import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, AlertController, IonButton, IonLabel, IonCol, IonGrid, IonRow, IonInput, IonIcon } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { AuthService } from 'src/app/services/auth.service'; // Importa AuthService
import { Router } from '@angular/router'; // Importa Router para redirección
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.page.html',
  styleUrls: ['./register1.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonIcon, IonInput, IonRow, IonGrid, IonCol, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarFormsComponent]
})
export class Register1Page implements OnInit {

  alertCtrl = inject(AlertController);
  password: string = '';
  showPassword: boolean = false;

  async mostrarAlerta(titulo: string, mensaje: string, tipo: 'error' | 'success' = 'success') {
    const color = tipo === 'success' ? 'success' : 'danger'; // Se utiliza 'success' o 'danger' para el color de fondo

    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
      cssClass: `custom-alert ${color}`, // Aplicamos la clase según el tipo de alerta
      mode: 'ios',
    });

    await alert.present();
  }

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    addIcons({ eye });
  }

  // Método para validar formato de correo electrónico
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
    return emailRegex.test(email);
  }

  register() {
    if (!this.user.fullName.trim() || !this.user.lastNameFather.trim() || !this.user.lastNameMother.trim() || !this.user.email.trim() || !this.user.password.trim()) {
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    if (!this.validarEmail(this.user.email)) {
      this.mostrarAlerta('Error', 'El formato del correo electrónico no es válido.', 'error');
      return;
    }

    this.authService.register(this.user).subscribe({
      next: (res) => {
        console.log('Usuario registrado:', res);
        this.mostrarAlerta('Éxito', 'Registro exitoso', 'success');

        this.user = {
          fullName: '',
          lastNameFather: '',
          lastNameMother: '',
          email: '',
          password: ''
        };

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        this.mostrarAlerta('Error', 'Error al registrar usuario.', 'error');
      }
    });
  }
}
