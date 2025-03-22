import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importamos Router
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
  IonRow,
  IonGrid,
  IonCol
} from '@ionic/angular/standalone';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { PublicacionesService } from '../services/publicaciones.service';
import { PublicacionesFarmaciaService } from '../services/publicaciones-farmacia.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg,
    IonGrid, IonRow, IonCol, CommonModule, FormsModule,
    NavbarComponent
  ],
})
export class HomePage implements OnInit {
  publicaciones: any[] = []; // Lista de publicaciones

  constructor(private publicacionesService: PublicacionesService, private router: Router, private publicacionesFarmaciaService: PublicacionesFarmaciaService,) {}

  ngOnInit() {
    // Usamos forkJoin para realizar ambas peticiones en paralelo y esperar a que ambas terminen
    forkJoin({
      hospitales: this.publicacionesService.obtenerPublicaciones(),
      farmacias: this.publicacionesFarmaciaService.obtenerPublicacionesFarmacia()
    }).subscribe({
      next: (data) => {
        // Aquí ya tenemos ambas respuestas, así que las combinamos
        this.publicaciones = [...data.hospitales, ...data.farmacias];
      },
      error: (err) => {
        console.error('Error al obtener publicaciones:', err);
      }
    });
  }


  // Método para navegar a la página de detalles
  verDetalle(publicacionId: string) {
    this.router.navigate(['/detail-publicacion', publicacionId]);
  }
}
