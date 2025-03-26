import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonIcon, IonSearchbar, IonImg } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HospitalService } from '../../../services/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/interfaces/hospital.model';
import { star, starOutline } from 'ionicons/icons'; // Importar iconos de estrellas
import { addIcons } from 'ionicons';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-hos-cards',
  templateUrl: './hos-cards.page.html',
  styleUrls: ['./hos-cards.page.scss'],
  standalone: true,
  imports: [IonImg, IonSearchbar,
    IonIcon, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent
  ]
})
export class HosCardsPage implements OnInit {
  rating: number = 0;

  private _hospitales = inject(HospitalService);
  hospitales: Hospital[] = [];  // Lista de hospitales
  starIcon = star;
  starOutlineIcon = starOutline;
  isSearching: boolean = false;

  constructor(
    private router: Router,
    private hospitalService: HospitalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
   addIcons({star,starOutline})

    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data.map(hospital => ({
          ...hospital,
          rating: hospital.rating ?? 0,
          img: hospital.img
        }));
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



}
