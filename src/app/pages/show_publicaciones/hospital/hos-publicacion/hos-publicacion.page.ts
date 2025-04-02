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

  constructor(private publicacionesService: PublicacionesService, private router: Router) {}

  ngOnInit() {
    this.publicacionesService.obtenerPublicaciones().subscribe({
      next: (data) => {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        this.publicaciones = data.filter(pub => pub.usuarioId === usuario._id); // Filtrar publicaciones del usuario actual
      },
      error: (err) => {
        console.error('Error al obtener publicaciones:', err);
      },
    });

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.esHospital = usuario.rol === 'hospital';
  }


  // Método para navegar a la página de detalles
  verDetalle(publicacionId: string) {
    this.router.navigate(['/detail-publicacion', publicacionId]);
  }

  // Método para eliminar una publicación
  eliminarPublicacion(publicacionId: string, event: Event) {
    event.stopPropagation(); // Evita que se navegue al detalle al hacer click en el botón eliminar
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
