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
  IonImg, IonRow, IonGrid, IonCol, IonButton
} from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { AlertController } from '@ionic/angular'; // Importamos AlertController

@Component({
  selector: 'app-hos-publicacion',
  templateUrl: './hos-publicacion.page.html',
  styleUrls: ['./hos-publicacion.page.scss'],
  standalone: true,
  imports: [IonCol, IonGrid, IonRow,
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
    IonButton
  ],
})
export class HosPublicacionPage implements OnInit {
  publicaciones: any[] = []; // Array para almacenar las publicaciones
  esHospital: boolean = false; // Variable que indica si el usuario es un hospital
  mostrarEliminar: boolean = true;

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router,
    private alertCtrl: AlertController // Inyectamos AlertController
  ) {}

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

    // Verificamos si el usuario tiene el rol de hospital
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.esHospital = usuario.rol === 'hospital';
  }

  // Método para navegar a la página de detalles
  verDetalle(publicacionId: string) {
    this.router.navigate(['/detail-publicacion', publicacionId]);
  }

  // Método para eliminar una publicación
  eliminarPublicacion(publicacionId: string, event: Event) {
    event.stopPropagation(); // Evita que se navegue al detalle al hacer clic en el botón eliminar

    // Usamos la alerta de confirmación personalizada
    this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar esta publicación?').then((confirmado) => {
      if (confirmado) {
        this.publicacionesService.eliminarPublicacion(publicacionId).subscribe({
          next: () => {
            this.mostrarAlerta('Éxito', 'Publicación eliminada correctamente', 'success');
            this.publicaciones = this.publicaciones.filter(p => p._id !== publicacionId); // Eliminar de la lista local
          },
          error: (err) => {
            console.error('Error al eliminar publicación:', err);
            this.mostrarAlerta('Error', 'Error al eliminar la publicación', 'error');
          }
        });
      }
    });
  }

  // Método para mostrar una alerta de confirmación
  async mostrarConfirmacion(mensaje: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: mensaje,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            return false; // Si el usuario hace clic en No, retornamos false
          }
        },
        {
          text: 'Sí',
          handler: () => {
            return true; // Si el usuario hace clic en Sí, retornamos true
          }
        }
      ]
    });

    await alert.present();

    // Esperamos que el alert se cierre y obtenemos la respuesta
    return new Promise((resolve) => {
      alert.onDidDismiss().then(() => {
        resolve(alert.role === 'cancel' ? false : true);
      });
    });
  }

  // Método para mostrar alertas de éxito o error
  async mostrarAlerta(titulo: string, mensaje: string, tipo: 'error' | 'success' = 'success') {
    const color = tipo === 'success' ? 'success' : 'danger';
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
      cssClass: `custom-alert ${color}`, // Aplicamos la clase según el tipo de alerta
    });

    await alert.present();
  }
}
