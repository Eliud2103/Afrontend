import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
  alertCtrl = inject(AlertController);

  titulo: string = '';
  descripcion: string = '';
  contenido: string = '';
  img: File | null = null;
  aceptarCondiciones: boolean = false;

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router
  ) {}

  ngOnInit() {}

  // Función para mostrar alertas
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.img = file;
    } else {
      this.mostrarAlerta('Error', 'Por favor, selecciona un archivo de imagen válido.', 'error');
      this.img = null;
    }
  }

  publicar() {
    if (!this.titulo.trim() || !this.descripcion.trim() || !this.contenido.trim() || !this.img || !this.aceptarCondiciones) {
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios y debes aceptar los términos y condiciones.', 'error');
      return;
    }

    this.publicacionesService.agregarPublicacion(this.titulo, this.descripcion, this.contenido, this.img).subscribe({
      next: () => {
        this.mostrarAlerta('Éxito', 'Publicación agregada exitosamente', 'success');
        this.limpiarFormulario();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al agregar la publicación:', err);
        this.mostrarAlerta('Error', 'Hubo un error al agregar la publicación. Intenta de nuevo.', 'error');
      }
    });
  }

  limpiarFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.contenido = '';
    this.img = null;
    this.aceptarCondiciones = false;
  }
}
