import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonGrid, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-hos-form',
  templateUrl: './hos-form.page.html',
  styleUrls: ['./hos-form.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonLabel, IonGrid, IonRow, IonCol, IonContent,NavbarComponent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HosFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
