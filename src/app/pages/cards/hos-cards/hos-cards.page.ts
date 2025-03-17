import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCol, IonRow, IonGrid, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HospitalService } from '../../../services/hospital.service';
import { StorageService } from '../../../services/storage.service'; // Importa el servicio de Storage
import { Router } from '@angular/router';
import { Hospital } from 'src/app/interfaces/hospital.model';

@Component({
  selector: 'app-hos-cards',
  templateUrl: './hos-cards.page.html',
  styleUrls: ['./hos-cards.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class HosCardsPage implements OnInit {
  hospitales: Hospital[] = [];  // Usa el tipo Hospital para obtener los datos correctamente tipados
  selectedFile: File | null = null;  // Variable para almacenar el archivo seleccionado
  hos = 'http://localhost:3000/file/67d5eb19c727c86dbf05b9f4';

  constructor(
    private router: Router,
    private hospitalService: HospitalService,
    private storageService: StorageService // Inyecta StorageService
  ) {}

  ngOnInit() {
    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data;
        console.log('Hospitales recibidos:', data);

        // Ajusta la URL de la imagen si es necesario
        this.hospitales.forEach(hospital => {
          if (hospital.img) {
            if (!hospital.img.startsWith('http')) {
              hospital.img = `http://localhost:3000/file/${hospital.img}`;  // Asigna la URL completa si es solo un nombre de archivo
            }
          }
        });
      },
      (error) => {
        console.error('Error al obtener hospitales', error);
      }
    );
  }

  // Método para manejar la carga de una nueva imagen
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Método para subir la imagen al backend
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

  // Método para redirigir a la página de detalles del hospital
  verDetalle(id: string) {
    this.router.navigate(['/detail-card', id]);
  }
}
