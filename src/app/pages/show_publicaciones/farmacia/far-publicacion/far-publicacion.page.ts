import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-far-publicacion',
  templateUrl: './far-publicacion.page.html',
  styleUrls: ['./far-publicacion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FarPublicacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
