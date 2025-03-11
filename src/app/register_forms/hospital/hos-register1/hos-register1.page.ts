import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-hos-register1',
  templateUrl: './hos-register1.page.html',
  styleUrls: ['./hos-register1.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarFormsComponent,SiTienesCuentaComponent]
})
export class HosRegister1Page {
  hos_register1 = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  };

  constructor(private router: Router) {}

  hos_register() {
    // Guardamos los datos en localStorage antes de cambiar de pantalla
    localStorage.setItem('hospitalStep1', JSON.stringify(this.hos_register1));

    // Navegamos a la siguiente pantalla
    this.router.navigate(['/hos-register2']);
  }
}
