import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle,
  IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonIcon, IonSearchbar,
  IonImg, IonButton
} from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { Router } from '@angular/router';
import { Farmacia } from 'src/app/interfaces/farmacia.model';
import { star, starOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-far-cards',
  templateUrl: './far-cards.page.html',
  styleUrls: ['./far-cards.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonImg, IonSearchbar, IonIcon, IonCard, IonCardContent, IonGrid,
    IonRow, IonCol, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule, NavbarComponent
  ]
})
export class FarCardsPage implements OnInit {
  farmacias: Farmacia[] = [];
  starIcon = star;
  starOutlineIcon = starOutline;
  isSearching: boolean = false;
  currentUser: any;
  alertCtrl = inject(AlertController);

  private _farmacias = inject(FarmaciaService);

  constructor(
    private router: Router,
    private farmaciaService: FarmaciaService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    addIcons({ star, starOutline });
    this.currentUser = this.authService.getCurrentUser();
    this.cargarFarmacias();
  }

  cargarFarmacias() {
    this.farmaciaService.getFarmacias().subscribe(
      (data) => {
        this.farmacias = data.map(farmacia => ({
          ...farmacia,
          rating: localStorage.getItem(`farmaciaRating-${farmacia._id}`)
            ? parseInt(localStorage.getItem(`farmaciaRating-${farmacia._id}`)!, 10)
            : farmacia.rating ?? 0,
          img: farmacia.img
        }));
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al obtener farmacias', error)
    );
  }

  verDetalle(id: string) {
    this.router.navigate(['/detail-card', id], { state: { type: 'farmacia' } });
  }

  buscarFarmacia(event: any) {
    const query = event.detail.value.trim();
    this.isSearching = query.length > 0;

    if (!query) {
      this.cargarFarmacias();
      return;
    }

    this._farmacias.searchFarmacia(query).subscribe(
      (farmacias) => {
        this.farmacias = [...farmacias];
      },
      (error) => {
        console.error('Error al buscar farmacias:', error);
        this.farmacias = [];
      }
    );
  }

  cargarImagenes() {
    // Asegura que las imágenes se recargan correctamente
    this.farmacias = this.farmacias.map(farmacia => ({
      ...farmacia,
      img: farmacia.img ? `http://localhost:3000/farmacia/imagen/${farmacia.img}` : ''
    }));
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  async eliminarFarmacia(farmaciaId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta farmacia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.farmaciaService.eliminarFarmacia(farmaciaId).subscribe({
              next: () => {
                this.farmacias = this.farmacias.filter(f => f._id !== farmaciaId);
                this.mostrarAlerta('Éxito', 'Farmacia eliminada correctamente', 'success');
              },
              error: () => {
                this.mostrarAlerta('Error', 'Hubo un problema al eliminar la farmacia', 'error');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarAlerta(titulo: string, mensaje: string, tipo: 'error' | 'success') {
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

  agregarFarmacia() {
    this.router.navigate(['/far-register1']);
  }
}
