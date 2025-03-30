import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSearchbar, IonImg, IonIcon, IonButton } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Farmacia } from 'src/app/interfaces/farmacia.model';
import { FarmaciaService } from 'src/app/services/farmacia.service';
import { star, starOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-far-cards',
  templateUrl: './far-cards.page.html',
  styleUrls: ['./far-cards.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonImg, IonSearchbar, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class FarCardsPage implements OnInit {
   private _farmacias = inject(FarmaciaService );
  farmacias: Farmacia[] = [];
  selectedFile: File | null = null;
  isSearching: boolean = false;
    starIcon = star;
    starOutlineIcon = starOutline;
    currentUser: any; // Usuario actual

  constructor(
    private router: Router,
    private farmaciaService: FarmaciaService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.currentUser = this.authService.getCurrentUser();
    addIcons({star,starOutline})
    this.farmaciaService.getFarmacias().subscribe(
      (data) => {
        this.farmacias = data.map(farmacia => ({
          ...farmacia,
          rating: localStorage.getItem(`farmaciaRating-${farmacia._id}`)
            ? parseInt(localStorage.getItem(`farmaciaRating-${farmacia._id}`)!, 10)
            : farmacia.rating ?? 0,
          img: farmacia.img
        }));
        console.log('Farmacias con calificación:', this.farmacias);
      },
      (error) => console.error('Error al obtener farmacias', error)
    );
  }
  // Método para eliminar un hospital
  eliminarFarmacia(farmaciaId: string) {
    this.farmaciaService.eliminarFarmacia(farmaciaId).subscribe(() => {
      // Eliminar el hospital de la lista después de la eliminación
      this.farmacias = this.farmacias.filter(h => h._id !== farmaciaId);
    });
  }

  // Método para redirigir al formulario de registro de hospital
  agregarFarmacia() {
    this.router.navigate(['/far-register1']); // Redirige al formulario de registro
  }
    // Método para verificar si el usuario es admin
    isAdmin(): boolean {
      return this.currentUser?.role === 'admin';
    }

  buscarFarmacia(event: any) {
    const query = event.detail.value.trim();
    this.isSearching = query.length > 0;

    if (!query) {
      this._farmacias.getFarmacias().subscribe(
        (data) => {
          this.farmacias = data.map(farmacia => ({
            ...farmacia,
            rating: localStorage.getItem(`farmaciaRating-${farmacia._id}`)
              ? parseInt(localStorage.getItem(`farmaciaRating-${farmacia._id}`)!, 10)
              : farmacia.rating ?? 0,
            img: farmacia.img?.startsWith('http') ? farmacia.img : `http://localhost:3000/file/${farmacia.img}`
          }));
        },
        (error) => console.error('Error al obtener farmacias', error)
      );
      return;
    }

    this._farmacias.searchFarmacia(query).subscribe(
      (farmacias) => {
        this.farmacias = farmacias.map(farmacia => ({
          ...farmacia,
          rating: localStorage.getItem(`farmaciaRating-${farmacia._id}`)
            ? parseInt(localStorage.getItem(`farmaciaRating-${farmacia._id}`)!, 10)
            : farmacia.rating ?? 0
        }));
      },
      (error) => {
        console.error('Error al buscar farmacias:', error);
        this.farmacias = [];
      }
    );
  }
 // Método para verificar si el usuario es admin







  // Método para redirigir a la página de detalles de la farmacia
  verDetalle(id: string) {
    this.router.navigate(['/detail-card', id], { state: { type: 'farmacia' } });  // Usando 'state' como en HosCardsPage
  }
}
