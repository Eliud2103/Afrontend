import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-far-register3',
  templateUrl: './far-register3.page.html',
  styleUrls: ['./far-register3.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, CommonModule, FormsModule, ReactiveFormsModule, NavbarFormsComponent, SiTienesCuentaComponent]
})
export class FarRegister3Page implements OnInit {

  far_register3: FormGroup = new FormGroup({});

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    // Cargar los datos del paso 2 desde localStorage si existen
    const farmaciaDataStep2 = JSON.parse(localStorage.getItem('farmaciaStep2') || '{}');

    // Inicializar el formulario con valores predeterminados
    this.far_register3 = this.fb.group({
      email_farmacia: ['', [Validators.required, Validators.email]],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      descripcion: ['']
    });

    // Cargar los datos del paso 2 si están disponibles
    const savedFarmacia = localStorage.getItem('farmaciaData');
    if (savedFarmacia) {
      const savedData=JSON.parse(savedFarmacia);
      this.far_register3.setValue({
        email_farmacia: savedData.email_farmacia || '',
        mision: savedData.mision || '',
        vision: savedData.vision || '',
        descripcion: savedData.descripcion || ''
      });
      console.log('Datos cargados en far-register3:', this.far_register3.value);
    }
  }

  // Función para registrar una farmacia
  register() {
    if (this.far_register3.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return; // Detener el registro si hay campos vacíos o incorrectos
    }

    // Guardar los datos del paso 3 en localStorage
   // const farmaciaDataStep3 = this.far_register3.value;
   // localStorage.setItem('farmaciaStep3', JSON.stringify(farmaciaDataStep3));

    // Llamar al servicio para registrar la farmacia
    this.authService.far_register(this.far_register3.value).subscribe({
      next: (res) => {
        console.log('Farmacia registrada:', res);
        alert('Registro exitoso');

        this.far_register3.reset();
        // Limpiar localStorage después del registro
          localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar farmacia:', err);
        alert('Error al registrar farmacia');
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
    if (this.far_register3.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;  // Detener el registro si hay campos vacíos o incorrectos
    }

    // Recuperamos los datos de los formularios anteriores
    const savedStep1 = JSON.parse(localStorage.getItem('farmaciaStep1') || '{}');
    const savedStep2 = JSON.parse(localStorage.getItem('farmaciaStep2') || '{}');

    // Combinamos todos los datos
    const allData = {
      ...savedStep1,
      ...savedStep2,
      ...this.far_register3.value,
    };

    // Verificar que todos los datos están presentes antes de enviarlos
    console.log('Datos completos para enviar:', allData);

    // Llamada a la API para registrar la farmacia
    this.authService.far_register(allData).subscribe({
      next: (res) => {
        console.log('Farmacia registrada:', res);
        alert('Registro exitoso');
        // Limpiar localStorage después del registro
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar farmacia:', err);
        alert('Error al registrar farmacia');
      }
    });
  }
}
