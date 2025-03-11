import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonInput, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-par-register1',
  templateUrl: './par-register1.page.html',
  styleUrls: ['./par-register1.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NavbarFormsComponent]
})
export class ParRegister1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
