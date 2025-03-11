import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-cli-register1',
  templateUrl: './cli-register1.page.html',
  styleUrls: ['./cli-register1.page.scss'],
  standalone: true,
  imports: [ SiTienesCuentaComponent, IonCol, IonRow, IonGrid, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NavbarFormsComponent]
})
export class CliRegister1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
