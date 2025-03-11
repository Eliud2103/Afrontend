import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonRow, IonSelectOption, IonCol, IonGrid } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-hos-register2',
  templateUrl: './hos-register2.page.html',
  styleUrls: ['./hos-register2.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonGrid, IonCol, IonRow, IonLabel,IonSelectOption, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarFormsComponent]
})
export class HosRegister2Page implements OnInit {
  hos_register2 = {
    name: '',
    type: '',
    licenseNumber: '',
    address: '',
    phone: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Cargar datos almacenados de la primera parte
    const savedHospitalStep1 = localStorage.getItem('hospitalStep1');
    if (savedHospitalStep1) {
      const hospitalData = JSON.parse(savedHospitalStep1);
      this.hos_register2 = { ...hospitalData, ...this.hos_register2 };
      console.log('Datos cargados en hos-register3:', this.hos_register2);
    }
  }

  goToNext() {
    // Guardar los datos de este paso sin perder los anteriores
    localStorage.setItem('hospitalStep2', JSON.stringify(this.hos_register2));
    this.router.navigate(['/hos-register3']);
  }
}
