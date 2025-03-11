import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hos-register4',
  templateUrl: './hos-register4.page.html',
  styleUrls: ['./hos-register4.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarFormsComponent]
})
export class HosRegister4Page implements OnInit {

  hospital = {
    description: ''
  };

  constructor(private router: Router) { }

  finalizeRegistration() {
    console.log('Datos finales del hospital:', this.hospital);
    alert('Registro completado con éxito');

    // Limpiar localStorage después del registro
    localStorage.removeItem('hospitalData');

    // Redirigir a la página de login
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    // Cargar datos almacenados de los pasos anteriores
    const savedHospital = localStorage.getItem('hospitalData');
    if (savedHospital) {
      this.hospital = { ...JSON.parse(savedHospital), ...this.hospital };
      console.log('Datos cargados en hos-register3:', this.hospital);
    }
  }

  registerHospital() {
    // Mostrar los datos del hospital antes de finalizar
    console.log('Datos del hospital:', this.hospital);
    alert('Registro del hospital completado con éxito');

    // Limpiar localStorage después de completar el registro
    localStorage.removeItem('hospitalData');

    // Redirigir a la página de login o al dashboard
    this.router.navigate(['/login']);
  }
}
