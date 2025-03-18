import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Farmacia } from 'src/app/interfaces/farmacia.model';
import { FarmaciaService } from 'src/app/services/farmacia.service';

@Component({
  selector: 'app-far-cards',
  templateUrl: './far-cards.page.html',
  styleUrls: ['./far-cards.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class FarCardsPage implements OnInit {
  farmacias: Farmacia[] = [];
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private farmaciaService: FarmaciaService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.farmaciaService.getFarmacias().subscribe(
      (data) => {
        this.farmacias = data.map(farmacia => ({
          ...farmacia,
          // Asegúrate de que la imagen sea válida
          img: farmacia.img?.startsWith('http') ? farmacia.img : `http://localhost:3000/file/${farmacia.img}`
        }));
        console.log('Farmacias recibidas:', this.farmacias);
      },
      (error) => {
        console.error('Error al obtener farmacias', error);
      }
    );
  }

  // Método para redirigir a la página de detalles de la farmacia
  verDetalle(id: string) {
    this.router.navigate(['/detail-card', id], { state: { type: 'farmacia' } });  // Usando 'state' como en HosCardsPage
  }
}
