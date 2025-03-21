import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCol,
  IonRow,
  IonGrid,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonItem,
  IonCheckbox
} from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hos-form',
  templateUrl: './hos-form.page.html',
  styleUrls: ['./hos-form.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonInput, IonLabel, IonGrid, IonRow, IonCol, IonContent,
    NavbarComponent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonIcon, IonItem, IonCheckbox
  ]
})
export class HosFormPage implements OnInit {

  titulo: string = '';
  descripcion: string = '';
  contenido: string = '';
  img: File | null = null;
  aceptarCondiciones: boolean = false; // ✅ Corregida la variable

  constructor(private publicacionesService: PublicacionesService, private router: Router) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.img = file;
    } else {
      alert('Por favor, selecciona un archivo de imagen válido.');
      this.img = null;
    }
  }

  publicar() {
    console.log('Título:', this.titulo);
    console.log('Descripción:', this.descripcion);
    console.log('Contenido:', this.contenido);
    console.log('Imagen seleccionada:', this.img);
    console.log('Acepta términos:', this.aceptarCondiciones);

    if (!this.titulo.trim() || !this.descripcion.trim() || !this.contenido.trim() || !this.img || !this.aceptarCondiciones) {
      alert('Todos los campos son obligatorios y debes aceptar los términos y condiciones.');
      return;
    }

    this.publicacionesService.agregarPublicacion(this.titulo, this.descripcion, this.contenido, this.img).subscribe({
      next: () => {
        alert('Publicación agregada exitosamente');
        this.limpiarFormulario();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al agregar la publicación:', err);
        alert('Hubo un error al agregar la publicación. Intenta de nuevo.');
      }
    });
  }

  limpiarFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.contenido = '';
    this.img = null;
    this.aceptarCondiciones = false; // ✅ Se reinicia el checkbox al limpiar el formulario
  }
}
