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
        this.farmacias = data;
        console.log('Farmacias recibidas:', data);

        // Ajusta la URL de la imagen si es necesario
        this.farmacias.forEach(farmacia => {
          if (farmacia.img) {
            if (!farmacia.img.startsWith('http')) {
              farmacia.img = `http://localhost:3000/file/${farmacia.img}`;
            }
          }
        });
      },
      (error) => {
        console.error('Error al obtener farmacias', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.storageService.uploadImage(this.selectedFile).subscribe(
        (response) => {
          console.log('Imagen subida con éxito:', response);
          alert('Imagen subida con éxito');
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          alert('Error al subir la imagen');
        }
      );
    } else {
      alert('Por favor, seleccione una imagen primero');
    }
  }

  verDetalle(id: string) {
    this.router.navigate(['/far-detalle', id]);
  }
}
