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
import { PublicacionesFarmaciaService } from 'src/app/services/publicaciones-farmacia.service';

@Component({
  selector: 'app-far-publicacion',
  templateUrl: './far-publicacion.page.html',
  styleUrls: ['./far-publicacion.page.scss'],
  standalone: true,
  imports: [
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
        console.error('Error al obtener publicaciones:', err); // En caso de error
      },
    });

    // Verificamos si el usuario tiene el rol de farmacia
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.esFarmacia = usuario.rol === 'farmacia';
  }

  // Método para navegar a la página de detalles
  verDetalle(publicacionId: string) {
    this.router.navigate(['/detail-publicacion', publicacionId]);
  }

  // Método para eliminar una publicación
  eliminarPublicacion(publicacionId: string, event: Event) {
    event.stopPropagation(); // Evita que se navegue al detalle al hacer clic en el botón eliminar
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      this.publicacionesService.eliminarPublicacion(publicacionId).subscribe({
        next: () => {
          alert('Publicación eliminada correctamente');
          this.publicaciones = this.publicaciones.filter(p => p._id !== publicacionId); // Eliminar de la lista local
        },
        error: (err) => {
          console.error('Error al eliminar publicación:', err);
          alert('Error al eliminar la publicación');
        }
      });
    }
  }
}
