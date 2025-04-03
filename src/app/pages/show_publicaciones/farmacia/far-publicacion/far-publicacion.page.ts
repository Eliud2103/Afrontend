import { Component, OnInit, inject } from '@angular/core';
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
  IonImg, IonRow, IonGrid, IonCol, IonButton,
  AlertController, IonIcon } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PublicacionesFarmaciaService } from 'src/app/services/publicaciones-farmacia.service';

@Component({
  selector: 'app-far-publicacion',
  templateUrl: './far-publicacion.page.html',
  styleUrls: ['./far-publicacion.page.scss'],
  standalone: true,
  imports: [IonIcon,
    IonCol, IonGrid, IonRow,
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
    IonButton,
    NavbarComponent,
    CommonModule,
    FormsModule
  ],
})
export class FarPublicacionPage implements OnInit {
  publicaciones: any[] = []; // Array para almacenar las publicaciones
  mostrarEliminar: boolean = true;
  esFarmacia: boolean = false; // Verificamos si el usuario es una farmacia
  alertCtrl = inject(AlertController); // Inyectamos el AlertController

  constructor(
    private publicacionesService: PublicacionesFarmaciaService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtenemos las publicaciones del servicio de farmacia
    this.publicacionesService.obtenerPublicacionesFarmacia().subscribe({
      next: (data) => {
        this.publicaciones = data; // Asignamos las publicaciones al array
      },
      error: (err) => {
        this.mostrarAlerta('Error', 'Error al obtener publicaciones', 'error'); // Mostrar alerta en caso de error
        console.error('Error al obtener publicaciones:', err); // En caso de error
      },
    });

    // Verificamos si el usuario tiene el rol de farmacia
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.esFarmacia = usuario.rol === 'farmacia';
  }

  // Método para mostrar alertas
  async mostrarAlerta(titulo: string, mensaje: string, tipo: 'error' | 'success' = 'success') {
    const icono = tipo === 'success' ? 'checkmark-circle-outline' : 'close-circle-outline';
    const color = tipo === 'success' ? 'success' : 'danger';

    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
      cssClass: `custom-alert ${color}`,
      mode: 'ios',
    });

    await alert.present();
  }

  // Método para navegar a la página de detalles
  verDetalle(publicacionId: string) {
    this.router.navigate(['/detail-publicacion', publicacionId]);
  }

  // Método para eliminar una publicación
 // Método para eliminar una publicación
eliminarPublicacion(publicacionId: string, event: Event) {
  event.stopPropagation(); // Evita que se navegue al detalle al hacer clic en el botón eliminar
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

}
