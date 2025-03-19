import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Para obtener parámetros de la URL
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-publicacion',
  templateUrl: './detail-publicacion.page.html',
  styleUrls: ['./detail-publicacion.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    CommonModule,
    FormsModule
  ]
})
export class DetailPublicacionPage implements OnInit {
  publicacion: any = {}; // Objeto para almacenar los detalles de la publicación

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService
  ) {}

  ngOnInit() {
    // Obtener el ID de la publicación desde los parámetros de la URL
    const publicacionId = this.route.snapshot.paramMap.get('id');
    if (publicacionId) {
      // Obtener los detalles de la publicación usando el ID
      this.publicacionesService.obtenerPublicacionPorId(publicacionId).subscribe({
        next: (data) => {
          this.publicacion = data;
        },
        error: (err) => {
          console.error('Error al obtener detalles de la publicación:', err);
        }
      });
    }
  }
}
