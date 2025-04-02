import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonRow, IonCol, IonGrid, IonIcon } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';

@Component({
  selector: 'app-hos-register1',
  templateUrl: './hos-register1.page.html',
  styleUrls: ['./hos-register1.page.scss'],
  standalone: true,
  imports: [IonIcon, ReactiveFormsModule, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarFormsComponent, SiTienesCuentaComponent]
})
export class HosRegister1Page implements OnInit {
  password: string = '';
  showPassword: boolean = false;
  // Datos del formulario
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  hos_register1: FormGroup = new FormGroup({});


  constructor(private router: Router) {}

  ngOnInit() {
    addIcons({ eye });
    // Inicializamos el formulario con validaciones
    this.hos_register1 = new FormGroup({
      nombre_responsable: new FormControl('', Validators.required),
      apellido_paterno_responsable: new FormControl('', Validators.required),
      apellido_materno_responsable: new FormControl('', Validators.required),
      email_responsable: new FormControl('', [Validators.required, Validators.email]),
      telefono_responsable: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // Función para manejar el registro
  hos_register() {
    if (this.hos_register1.invalid) {
      alert('Por favor complete todos los campos');
      return;  // Detener si el formulario es inválido
    }

    // Si el formulario es válido, procesamos los datos
    console.log('Datos del formulario:', this.hos_register1.value);

    // Guardamos los datos en localStorage antes de cambiar de pantalla
    localStorage.setItem('hospitalStep1', JSON.stringify(this.hos_register1.value));

    // Navegamos a la siguiente pantalla
    this.router.navigate(['/hos-register2']);
  }
}
