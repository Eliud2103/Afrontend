import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonCardTitle, IonCardHeader, IonCard, IonBackButton, IonCardContent } from '@ionic/angular/standalone';
import { HospitalService } from 'src/app/services/hospital.service';  // Asegúrate de importar HospitalService

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.page.html',
  styleUrls: ['./detail-card.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailCardPage implements OnInit {
  hospital: any = {};  // Almacenará los datos del hospital

  constructor(
    private route: ActivatedRoute,
    private hospitalService: HospitalService  // Usamos HospitalService aquí
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la URL
    if (id) {
      this.hospitalService.getHospitalDetails(id).subscribe({
        next: (data) => {
          this.hospital = data;  // Asigna los datos del hospital a la variable hospital
        },
        error: (err) => {
          console.error('❌ Error al obtener hospital:', err);  // Manejo de errores
        }
      });
    }
  }

}
