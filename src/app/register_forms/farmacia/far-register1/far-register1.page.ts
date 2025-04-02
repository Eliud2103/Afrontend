import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonLabel, IonInput, IonRow, IonCol, IonGrid, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';

@Component({
  selector: 'app-far-register1',
  templateUrl: './far-register1.page.html',
  styleUrls: ['./far-register1.page.scss'],
  standalone: true,
  imports: [IonIcon, SiTienesCuentaComponent,ReactiveFormsModule, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, CommonModule, NavbarFormsComponent]
})
export class FarRegister1Page implements OnInit {
  password: string = '';
  showPassword: boolean = false;


  far_register1: FormGroup = new FormGroup({});


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private router: Router) {}

  ngOnInit() {
    addIcons({ eye });
    // Inicializamos el formulario con validaciones
    this.far_register1 = new FormGroup({
      nombre_responsable: new FormControl('', Validators.required),
      apellido_paterno_responsable: new FormControl('', Validators.required),
      apellido_materno_responsable: new FormControl('', Validators.required),
      email_responsable: new FormControl('', [Validators.required, Validators.email]),
      telefono_responsable: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // Función para manejar el registro
  far_register() {
    if (this.far_register1.invalid) {
      alert('Por favor complete todos los campos');
      return;  // Detener si el formulario es inválido
    }

    // Si el formulario es válido, procesamos los datos
    console.log('Datos del formulario:', this.far_register1.value);

    // Guardamos los datos en localStorage antes de cambiar de pantalla
    localStorage.setItem('farmaciaStep1', JSON.stringify(this.far_register1.value));

    // Navegamos a la siguiente pantalla
    this.router.navigate(['/far-register2']);
  }
}
