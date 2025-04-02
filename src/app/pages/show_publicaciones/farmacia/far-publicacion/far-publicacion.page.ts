import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importamos Router
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonRow, IonGrid,
  IonCol, IonButton, AlertController
} from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PublicacionesFarmaciaService } from 'src/app/services/publicaciones-farmacia.service';

@Component({
  selector: 'app-far-publicacion',
  templateUrl: './far-publicacion.page.html',
  styleUrls: ['./far-publicacion.page.scss'],
  standalone: true,
  imports: [
    IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonImg, IonButton, NavbarComponent, CommonModule, FormsModule
  ],
})
export class FarPublicacionPage implements OnInit {
  alertCtrl = inject(AlertController);
  publicaciones: any[] = []; // Array para almacenar las publicaciones
  mostrarEliminar: boolean = true;
  esFarmacia: boolean = false; // Verificamos si el usuario es una farmacia

  constructor(
    private publicacionesService: PublicacionesFarmaciaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.publicacionesService.obtenerPublicacionesFarmacia().subscribe({
      next: (data) => {
        this.publicaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener publicaciones:', err);
      },
    });

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.esFarmacia = usuario.rol === 'farmacia';
  }

  async mostrarAlerta(titulo: string, mensaje: string, tipo: 'error' | 'success' = 'success') {
    const icono = tipo === 'success' ? 'checkmark-circle' : 'close-circle';
    const color = tipo === 'success' ? 'success' : 'danger';

    const alert = await this.alertCtrl.create({
      header: `<ion-icon name="${icono}" class="alert-icon ${color}"></ion-icon><br>${titulo}`,
      message: `<p class="alert-text">${mensaje}</p>`,
      buttons: ['OK'],
      cssClass: `custom-alert ${color}`,
      mode: 'ios',
    });
    await alert.present();
  }

  verDetalle(publicacionId: string) {
    this.router.navigate(['/detail-publicacion', publicacionId]);
  }

  eliminarPublicacion(publicacionId: string, event: Event) {
    event.stopPropagation();
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      this.publicacionesService.eliminarPublicacion(publicacionId).subscribe({
        next: () => {
          this.mostrarAlerta('Éxito', 'Publicación eliminada correctamente', 'success');
          this.publicaciones = this.publicaciones.filter(p => p._id !== publicacionId);
        },
        error: (err) => {
          console.error('Error al eliminar publicación:', err);
          this.mostrarAlerta('Error', 'Error al eliminar la publicación', 'error');
        }
      });
    }
  }
}
