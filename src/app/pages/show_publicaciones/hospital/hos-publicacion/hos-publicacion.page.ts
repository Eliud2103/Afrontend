import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-hos-publicacion',
  templateUrl: './hos-publicacion.page.html',
  styleUrls: ['./hos-publicacion.page.scss'],
  standalone: true,
  imports: [IonContent,NavbarComponent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HosPublicacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
