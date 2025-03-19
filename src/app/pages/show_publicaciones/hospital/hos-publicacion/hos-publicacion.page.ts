import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-hos-publicacion',
  templateUrl: './hos-publicacion.page.html',
  styleUrls: ['./hos-publicacion.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    NavbarComponent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
  ],
})
export class HosPublicacionPage implements OnInit {
  publicaciones: any[] = []; // Array para almacenar las publicaciones

  constructor(private publicacionesService: PublicacionesService) {}

  ngOnInit() {
    // Al iniciar el componente, obtenemos las publicaciones del backend
    this.publicacionesService.obtenerPublicaciones().subscribe({
      next: (data) => {
        this.publicaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener publicaciones:', err);
      },
    });
  }
}
