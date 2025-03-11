import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-far-register1',
  templateUrl: './far-register1.page.html',
  styleUrls: ['./far-register1.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NavbarFormsComponent]
})
export class FarRegister1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
