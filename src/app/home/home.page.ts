import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
  IonCol, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { PublicacionesService } from '../services/publicaciones.service';
import { PublicacionesFarmaciaService } from '../services/publicaciones-farmacia.service';
import { forkJoin } from 'rxjs';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg,
    IonGrid, IonRow, IonCol, CommonModule, FormsModule,
    NavbarComponent
  ],
})
export class HomePage implements OnInit {
  userRole: string = '';
  alerControl = inject(AlertController);
  publicaciones: any[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router,
    private publicacionesFarmaciaService: PublicacionesFarmaciaService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('role') || '';

    addIcons({ heart, heartOutline });

    forkJoin({
      hospitales: this.publicacionesService.obtenerPublicaciones(),
      farmacias: this.publicacionesFarmaciaService.obtenerPublicacionesFarmacia()
    }).subscribe({
      next: (data) => {
        const savedLikes = JSON.parse(localStorage.getItem('likes') || '{}');

        this.publicaciones = [...data.hospitales, ...data.farmacias].map(pub => ({
          ...pub,
          liked: savedLikes[pub._id] || false,
          likesCount: pub.likesCount || 1
        }));
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

  async myAlert() {
    const alert = await this.alerControl.create({
      message: 'Ha dado me encanta',
      buttons: ['OK']
    });
    await alert.present();
  }

  toggleLike(publicacion: any, event: Event) {
    event.stopPropagation();

    let savedLikes = JSON.parse(localStorage.getItem('likes') || '{}');

    if (publicacion.liked) {
      publicacion.liked = false;
      publicacion.likesCount--;
    } else {
      publicacion.liked = true;
      publicacion.likesCount++;
    }

    savedLikes[publicacion._id] = { liked: publicacion.liked, likesCount: publicacion.likesCount };
    localStorage.setItem('likes', JSON.stringify(savedLikes));
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
