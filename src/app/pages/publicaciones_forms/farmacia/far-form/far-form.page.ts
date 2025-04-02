import { Component, inject, OnInit } from '@angular/core';
import { PublicacionesFarmaciaService } from 'src/app/services/publicaciones-farmacia.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  IonItem,
  AlertController
} from "@ionic/angular/standalone";
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-far-form',
  templateUrl: './far-form.page.html',
  styleUrls: ['./far-form.page.scss'],
  standalone: true,
  imports: [
    IonGrid, IonRow, IonCol, IonToolbar, IonHeader, IonContent,
    IonTitle, IonLabel, IonInput, IonTextarea, IonButton, IonCheckbox,
    NavbarComponent, FormsModule, IonItem
  ]
})
export class FarFormPage implements OnInit {
  alertCtrl = inject(AlertController);

  titulo = '';
  descripcion = '';
  contenido = '';
  img: File | null = null;
  aceptarCondiciones: boolean = false;

  constructor(
    private publicacionesFarmaciaService: PublicacionesFarmaciaService,
    private router: Router
  ) {}

  ngOnInit() {}

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
      this.mostrarAlerta('Error', 'Selecciona una imagen válida.', 'error');
      this.img = null;
    }
  }

  publicar() {
    if (!this.titulo.trim() || !this.descripcion.trim() || !this.contenido.trim() || !this.img || !this.aceptarCondiciones) {
      this.mostrarAlerta('Error', 'Todos los campos y la aceptación de términos son obligatorios.', 'error');
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
        this.mostrarAlerta('Éxito', 'Publicación agregada correctamente', 'success');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al agregar publicación:', err);
        this.mostrarAlerta('Error', 'Error al agregar la publicación.', 'error');
      }
    });
  }
}
