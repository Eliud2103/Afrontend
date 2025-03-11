import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-par-register2',
  templateUrl: './par-register2.page.html',
  styleUrls: ['./par-register2.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonRow, IonGrid, IonCol, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NavbarFormsComponent]
})
export class ParRegister2Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
