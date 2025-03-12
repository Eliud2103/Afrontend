import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hos-register3',
  templateUrl: './hos-register3.page.html',
  styleUrls: ['./hos-register3.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, CommonModule, FormsModule, ReactiveFormsModule, NavbarFormsComponent]
})
export class HosRegister3Page implements OnInit {

  hos_register3: FormGroup = new FormGroup({});

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
  const hospitalDataStep2 = JSON.parse(localStorage.getItem('hospitalStep2') || '{}');


    // Inicializamos el formulario con el FormBuilder
    this.hos_register3 = this.fb.group({
      email_hospital: ['', [Validators.required, Validators.email]],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      descripcion: ['']
    });

    // Cargar datos almacenados de la página anterior
    const savedHospital = localStorage.getItem('hospitalData');
    if (savedHospital) {
      const savedData = JSON.parse(savedHospital);
      this.hos_register3.setValue({
        email_hospital: savedData.email_hospital || '',
        mision: savedData.mision || '',
        vision: savedData.vision || '',
        descripcion: savedData.descripcion || ''
      });
      console.log('Datos cargados en hos-register3:', this.hos_register3.value);
    }
  }

  // Función para registrar un hospital

  register() {

    if (this.hos_register3.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    this.authService.hos_register(this.hos_register3.value).subscribe({
      next: (res) => {
        console.log('Hospital registrado:', res);
        alert('Registro exitoso');

        // Limpiar los campos del formulario
        this.hos_register3.reset();

        // Limpiar localStorage después del registro
        localStorage.removeItem('hospitalStep1');
        localStorage.removeItem('hospitalStep2');
        localStorage.removeItem('hospitalStep3');

        // Redirigir a la página de login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar hospital:', err);
        alert('Error al registrar hospital');
      }
    });
    const savedStep1 = JSON.parse(localStorage.getItem('hospitalStep1') || '{}');
    const savedStep2 = JSON.parse(localStorage.getItem('hospitalStep2') || '{}');

    console.log('Datos Step 1:', savedStep1);
    console.log('Datos Step 2:', savedStep2);

    if (!savedStep1 || !savedStep2) {
      alert('Datos incompletos. Asegúrate de que todos los pasos estén completados.');
      return;
    }
  }

  // Función para finalizar el registro con validación
    finalizeRegistration() {

    if (this.hos_register3.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;  // Detener el registro si hay campos vacíos o incorrectos
    }

    // Recuperamos los datos de los formularios anteriores
    const savedStep1 = JSON.parse(localStorage.getItem('hospitalStep1') || '{}');
    const savedStep2 = JSON.parse(localStorage.getItem('hospitalStep2') || '{}');

    // Combinamos todos los datos
    const allData = {
      ...savedStep1,
      ...savedStep2,
      ...this.hos_register3.value,
    };

    // Verificar que todos los datos están presentes antes de enviarlos
    console.log('Datos completos para enviar:', allData);

    // Llamada a la API
    this.authService.hos_register(allData).subscribe({
      next: (res) => {
        console.log('Hospital registrado:', res);
        alert('Registro exitoso');
        // Limpiar localStorage después del registro
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar hospital:', err);
        alert('Error al registrar hospital');
      }
    });
  }

}
