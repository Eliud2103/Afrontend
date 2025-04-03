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
import { HospitalService } from '../../../services/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/interfaces/hospital.model';
import { star, starOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hos-cards',
  templateUrl: './hos-cards.page.html',
  styleUrls: ['./hos-cards.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonImg, IonSearchbar, IonIcon, IonCard, IonCardContent, IonGrid,
    IonRow, IonCol, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule, NavbarComponent
  ]
})
export class HosCardsPage implements OnInit {
  rating: number = 0;
  private _hospitales = inject(HospitalService);
  hospitales: Hospital[] = [];
  starIcon = star;
  starOutlineIcon = starOutline;
  isSearching: boolean = false;
  currentUser: any;
  alertCtrl = inject(AlertController);

  constructor(
    private router: Router,
    private hospitalService: HospitalService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    addIcons({ star, starOutline });
    this.currentUser = this.authService.getCurrentUser();
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data.map(hospital => ({
          ...hospital,
          rating: localStorage.getItem(`hospitalRating-${hospital._id}`)
            ? parseInt(localStorage.getItem(`hospitalRating-${hospital._id}`)!, 10)
            : hospital.rating ?? 0,
          img: hospital.img
        }));
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al obtener hospitales', error)
    );
  }

  verDetalle(id: string) {
    this.router.navigate(['/detail-card', id], { state: { type: 'hospital' } });
  }

  buscarHospital(event: any) {
    const query = event.detail.value.trim();
    this.isSearching = query.length > 0;

    if (!query) {
      this.cargarHospitales();
      return;
    }

    this._hospitales.searchHospital(query).subscribe(
      (hospitales) => {
        this.hospitales = [...hospitales];
      },
      (error) => {
        console.error('Error al buscar hospitales:', error);
        this.hospitales = [];
      }
    );
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  async eliminarHospital(hospitalId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este hospital?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.hospitalService.eliminarHospital(hospitalId).subscribe({
              next: () => {
                this.hospitales = this.hospitales.filter(h => h._id !== hospitalId);
                this.mostrarAlerta('Éxito', 'Hospital eliminado correctamente', 'success');
              },
              error: () => {
                this.mostrarAlerta('Error', 'Hubo un problema al eliminar el hospital', 'error');
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

  agregarHospital() {
    this.router.navigate(['/hos-register1']);
  }
}
