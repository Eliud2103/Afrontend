import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonIcon, IonSearchbar, IonImg, IonButton } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HospitalService } from '../../../services/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/interfaces/hospital.model';
import { star, starOutline } from 'ionicons/icons'; // Importar iconos de estrellas
import { addIcons } from 'ionicons';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Importar servicio de autenticación

@Component({
  selector: 'app-hos-cards',
  templateUrl: './hos-cards.page.html',
  styleUrls: ['./hos-cards.page.scss'],
  standalone: true,
  imports: [IonButton, IonImg, IonSearchbar,
    IonIcon, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent
  ]
})
export class HosCardsPage implements OnInit {
  rating: number = 0;
  private _hospitales = inject(HospitalService);
  hospitales: Hospital[] = [];  // Lista de hospitales
  starIcon = star;
  currentUser: any; // Usuario actual
  starOutlineIcon = starOutline;
  isSearching: boolean = false;

  constructor(
    private router: Router,
    private hospitalService: HospitalService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService // Servicio de autenticación
  ) {}

  ngOnInit() {
    addIcons({ star, starOutline });

    // Obtener el usuario actual desde el servicio de autenticación
    this.currentUser = this.authService.getCurrentUser();

    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data.map(hospital => ({
          ...hospital,
          rating: localStorage.getItem(`hospitalRating-${hospital._id}`)
            ? parseInt(localStorage.getItem(`hospitalRating-${hospital._id}`)!, 10)
            : hospital.rating ?? 0, // Usar la calificación almacenada o la del backend
          img: hospital.img
        }));
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener hospitales', error);
      }
    );
  }

  // Método para redirigir a la página de detalles del hospital
  verDetalle(id: string) {
    this.router.navigate(['/detail-card', id], { state: { type: 'hospital' } });
  }

  // Método para buscar hospitales
  buscarHospital(event: any) {
    const query = event.detail.value.trim();
    this.isSearching = query.length > 0;

    if (!query) {
      this.hospitalService.getHospitales().subscribe(
        (data) => {
          this.hospitales = data.map(hospital => ({
            ...hospital,
            rating: hospital.rating ?? 0,
            img: hospital.img?.startsWith('http') ? hospital.img : `http://localhost:3000/file/${hospital.img}`
          }));

          // Forzar la actualización del componente
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error al obtener hospitales', error);
        }
      );
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

  // Método para verificar si el usuario es admin
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  // Método para eliminar un hospital
  eliminarHospital(hospitalId: string) {
    this.hospitalService.eliminarHospital(hospitalId).subscribe(() => {
      // Eliminar el hospital de la lista después de la eliminación
      this.hospitales = this.hospitales.filter(h => h._id !== hospitalId);
    });
  }

  // Método para redirigir al formulario de registro de hospital
  agregarHospital() {
    this.router.navigate(['/hos-register1']); // Redirige al formulario de registro
  }
}
