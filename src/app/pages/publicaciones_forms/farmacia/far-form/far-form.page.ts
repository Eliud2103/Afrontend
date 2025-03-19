import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonCol, IonRow, IonGrid, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-far-form',
  templateUrl: './far-form.page.html',
  styleUrls: ['./far-form.page.scss'],
  standalone: true,
  imports: [IonButton, NavbarComponent, IonTextarea, IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FarFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
