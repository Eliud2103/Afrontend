import { Component, OnInit } from '@angular/core';
import { PublicacionesFarmaciaService } from 'src/app/services/publicaciones-farmacia.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Importaciones de Ionic Standalone
import {
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  IonHeader,
  IonContent,
  IonTitle,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonCheckbox,
  IonItem// ✅ Importamos IonCheckbox
} from "@ionic/angular/standalone";
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-far-form',
  templateUrl: './far-form.page.html',
  styleUrls: ['./far-form.page.scss'],
  standalone: true,
  imports: [
    IonGrid, IonRow, IonCol, IonToolbar, IonHeader, IonContent,
    IonTitle, IonLabel, IonInput, IonTextarea, IonButton, IonCheckbox, // ✅ Agregamos IonCheckbox
    NavbarComponent, FormsModule,IonItem
  ]
})
export class FarFormPage implements OnInit {
  titulo = '';
  descripcion = '';
  contenido = '';
  img: File | null = null;
  aceptarCondiciones: boolean = false; // ✅ Corregida la variable

  constructor(
    private publicacionesFarmaciaService: PublicacionesFarmaciaService,
    private router: Router
  ) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.img = file;
    } else {
      alert('Selecciona una imagen válida.');
      this.img = null;
    }
  }

  publicar() {
    if (!this.titulo.trim() || !this.descripcion.trim() || !this.contenido.trim() || !this.img || !this.aceptarCondiciones) {
      alert('Todos los campos y la aceptación de términos son obligatorios.');
      return;
    }

    this.publicacionesFarmaciaService.agregarPublicacionFarmacia(
      this.titulo,
      this.descripcion,
      this.contenido,
      this.img
    )
    .subscribe({
      next: () => {
        alert('Publicación agregada correctamente');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al agregar publicación:', err);
        alert('Error al agregar la publicación.');
      }
    });
  }
}
