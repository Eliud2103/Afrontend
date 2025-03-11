import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-hos-register3',
  templateUrl: './hos-register3.page.html',
  styleUrls: ['./hos-register3.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarFormsComponent]
})
export class HosRegister3Page implements OnInit {

  hos_register3 = {
    email: '',
    mission: '',
    vision: '',
    description: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Cargar datos almacenados de la página anterior
    const savedHospital = localStorage.getItem('hospitalData');
    if (savedHospital) {
      this.hos_register3 = { ...JSON.parse(savedHospital), ...this.hos_register3 };
      console.log('Datos cargados en hos-register3:', this.hos_register3);
    }
  }

  // Función para finalizar el registro con validación
  finalizeRegistration() {
    // Verificar si algún campo está vacío
    if (!this.hos_register3.email || !this.hos_register3.mission || !this.hos_register3.vision || !this.hos_register3.description) {
      alert('Por favor, complete todos los campos antes de finalizar el registro.');
      return;  // Detener el registro si hay campos vacíos
    }

    // Si todos los campos están completos
    console.log('Datos finales del hospital:', this.hos_register3);
    alert('Registro completado con éxito');

    // Limpiar localStorage después del registro
    localStorage.removeItem('hospitalData');

    // Redirigir a la página de login
    this.router.navigate(['/login']);
  }

  // Función para avanzar al siguiente paso (aunque ya no es necesario, por si quieres usarla en el futuro)
  goToNext() {
    localStorage.setItem('hospitalData', JSON.stringify(this.hos_register3));
    this.router.navigate(['/hos-register4']);  // Si ya no tienes la página de hos-register4, la puedes eliminar
  }
}
