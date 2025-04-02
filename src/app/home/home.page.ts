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
  IonCol,
  IonText
} from '@ionic/angular/standalone';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { PublicacionesService } from '../services/publicaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg,
    IonGrid, IonRow, IonCol, CommonModule, FormsModule,
    NavbarComponent, IonText 
  ],
})
export class HomePage implements OnInit {
  publicaciones: any[] = [];
  filteredPublicaciones: any[] = []; 

  constructor(private publicacionesService: PublicacionesService, private router: Router) {}

  ngOnInit() {
    this.publicacionesService.obtenerPublicaciones().subscribe({
      next: (data) => {
        this.publicaciones = data; 
        Swal.fire({
          title: '¡Éxito!',
          text: 'Contraseña cambiada exitosamente',
          icon: 'success',
          backdrop: `
            rgba(0,0,0,0.7)
            url("/assets/images/nyan-cat.gif")
            center top
            no-repeat
          `,
          customClass: {
            popup: 'custom-swal-popup' // Clase personalizada
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener publicaciones:', err);
      },
    });
  }

  // Método para navegar a la página de detalles
  verDetalle(publicacionId: string) {
    this.router.navigate(['/detail-publicacion', publicacionId]);
  }
}
