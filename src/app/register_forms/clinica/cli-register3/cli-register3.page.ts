import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-cli-register3',
  templateUrl: './cli-register3.page.html',
  styleUrls: ['./cli-register3.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonGrid, IonRow, IonCol, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NavbarFormsComponent]
})
export class CliRegister3Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
