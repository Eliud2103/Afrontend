import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonIcon, IonCardSubtitle } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HospitalService } from '../../../services/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/interfaces/hospital.model';
import { star, starOutline } from 'ionicons/icons';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-hos-cards',
  templateUrl: './hos-cards.page.html',
  styleUrls: ['./hos-cards.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent, IonCardSubtitle
  ]
})
export class HosCardsPage implements OnInit, OnDestroy {
  hospitales: Hospital[] = [];  // Lista completa de hospitales
  filteredHospitales: Hospital[] = []; // Hospitales filtrados
  private searchSub!: Subscription;

  constructor(
    private router: Router,
    private hospitalService: HospitalService,
    private searchService: SearchService
  ) {
    addIcons({ star, starOutline }); // Añade los iconos de estrellas
  }

  ngOnInit() {
    this.loadHospitales();
    
    // Suscripción a los cambios en el término de búsqueda
    this.searchSub = this.searchService.currentSearch.subscribe({
      next: (query) => {
        console.log('Página recibió:', query); // Debug 3
        this.filterHospitales(query);
      },
      error: (err) => {
        console.error('Error en suscripción:', err);
      }
    });
  }

  loadHospitales() {
    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data.map(hospital => ({
          ...hospital,
          rating: hospital.rating ?? 0,
          img: hospital.img?.startsWith('http') ? hospital.img : `http://localhost:3000/file/${hospital.img}`
        }));
        this.filteredHospitales = [...this.hospitales]; // Inicializa los datos filtrados
      },
      (error) => {
        console.error('Error al obtener hospitales', error);
      }
    );
  }

  filterHospitales(searchTerm: string) {
    console.log('Filtrando con:', searchTerm, 'Datos:', this.hospitales); // Debug 4
    if (!searchTerm) {
      this.filteredHospitales = [...this.hospitales];
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredHospitales = this.hospitales.filter(hospital => 
      hospital.nombre_hospital?.toLowerCase().includes(term) ||
      hospital.tipo_hospital?.toLowerCase().includes(term) ||
      hospital.direccion?.toLowerCase().includes(term)
    );
  }

  verDetalle(id: string) {
    this.router.navigate(['/detail-card', id], { state: { type: 'hospital' } });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
}