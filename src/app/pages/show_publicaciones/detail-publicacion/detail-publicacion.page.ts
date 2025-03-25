import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { PublicacionesFarmaciaService } from 'src/app/services/publicaciones-farmacia.service';
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
import { NavbarComponent } from "../../../components/navbar/navbar.component";

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
    FormsModule,
    NavbarComponent
  ]
})
export class DetailPublicacionPage implements OnInit {
  publicacion: any = {}; // Objeto para almacenar los detalles de la publicación
  esFarmacia: boolean = false; // Variable para identificar si es publicación de farmacia

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private publicacionesFarmaciaService: PublicacionesFarmaciaService
  ) {}

  ngOnInit() {
    // Obtener los parámetros de la URL
    const publicacionId = this.route.snapshot.paramMap.get('id');
    const tipo = this.route.snapshot.queryParamMap.get('tipo'); // Obtiene el parámetro 'tipo'

    // Si se ha proporcionado un ID de publicación
    if (publicacionId) {
      if (publicacionId) {

        // Marca como farmacia
        // Obtener la publicación de farmacia
        this.publicacionesFarmaciaService.obtenerPublicacionPorId(publicacionId).subscribe({
          next: (data) => {
            this.publicacion = data || {}; // Evita que sea null
          },
          error: (err) => {
            console.error('Error al obtener detalles de la publicación de farmacia:', err);
          }
        });
      } else {
        // Obtener la publicación de hospital (por defecto, si no es farmacia)
        this.publicacionesService.obtenerPublicacionPorId(publicacionId).subscribe({
          next: (data) => {
            this.publicacion = data || {}; // Evita que sea null
          },
          error: (err) => {
            console.error('Error al obtener detalles de la publicación:', err);
          }
        });
      }
    }
  }
}
