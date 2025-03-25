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

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private publicacionesFarmaciaService: PublicacionesFarmaciaService
  ) {}

  ngOnInit() {
    // Obtener el parámetro 'id' de la URL
    const publicacionId = this.route.snapshot.paramMap.get('id');

    // Verificamos si el 'publicacionId' está presente
    if (publicacionId) {
      // Intentamos primero obtener la publicación de la farmacia
      this.publicacionesFarmaciaService.obtenerPublicacionPorId(publicacionId).subscribe({
        next: (data) => {
          if (data) {
            this.publicacion = data; // Si se obtiene una publicación de farmacia, la asignamos
          } else {
            // Si no existe la publicación de farmacia, intentamos obtener la publicación de hospital
            this.publicacionesService.obtenerPublicacionPorId(publicacionId).subscribe({
              next: (data) => {
                this.publicacion = data || {}; // Si no hay datos, asignamos un objeto vacío
              },
              error: (err) => {
                console.error('Error al obtener detalles de la publicación de hospital:', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Error al obtener detalles de la publicación de farmacia:', err);
          // Si hay un error al obtener la publicación de farmacia, intentamos la de hospital
          this.publicacionesService.obtenerPublicacionPorId(publicacionId).subscribe({
            next: (data) => {
              this.publicacion = data || {}; // Si no hay datos, asignamos un objeto vacío
            },
            error: (err) => {
              console.error('Error al obtener detalles de la publicación de hospital:', err);
            }
          });
        }
      });
    }
  }
}
