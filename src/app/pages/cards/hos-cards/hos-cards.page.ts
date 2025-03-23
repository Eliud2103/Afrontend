import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HospitalService } from '../../../services/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/interfaces/hospital.model';
import { star, starOutline } from 'ionicons/icons'; // Importar iconos de estrellas

@Component({
  selector: 'app-hos-cards',
  templateUrl: './hos-cards.page.html',
  styleUrls: ['./hos-cards.page.scss'],
  standalone: true,
  imports: [IonSearchbar,
    IonIcon, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent
  ]
})
export class HosCardsPage implements OnInit {
  private _hospitales = inject(HospitalService);
  hospitales: Hospital[] = [];  // Lista de hospitales
  starIcon = star;
  starOutlineIcon = starOutline;
  isSearching: boolean = false;

  constructor(
    private router: Router,
    private hospitalService: HospitalService
  ) {}

  ngOnInit() {
    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data.map(hospital => ({
          ...hospital,
          rating: hospital.rating ?? 0,  // Si no tiene rating, asigna 0 (uso de ?? para valores null o undefined)
          img: hospital.img?.startsWith('http') ? hospital.img : `http://localhost:3000/file/${hospital.img}`
        }));
        console.log('Hospitales recibidos:', this.hospitales);
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
  buscarHospital(event: any) {
    const query = event.detail.value.trim();
    this.isSearching = query.length > 0;

    // Si el campo está vacío, no realizamos la búsqueda
    if (!query) {
      this.hospitales = [];
      return;
    }

    // Llamamos al método searchHospital del servicio para buscar por tipo_hospital
    this._hospitales.searchHospital(query).subscribe(
      (hospitales) => {
        this.hospitales = hospitales;  // Actualizamos la lista con los hospitales encontrados
      },
      (error) => {
        console.error('Error al buscar hospitales:', error);  // Si hay error, mostramos en consola
        this.hospitales = [];  // Limpiamos la lista en caso de error
      }
    );
  }


}
