import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCol, IonRow, IonGrid, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hos-cards',
  templateUrl: './hos-cards.page.html',
  styleUrls: ['./hos-cards.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavbarComponent]
})
export class HosCardsPage implements OnInit {
  hospitales: any[] = [];

  constructor(private hospitalService: HospitalService) {}

  ngOnInit() {
    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data;
        console.log('Hospitales recibidos:', data);
      },
      (error) => {
        console.error('Error al obtener hospitales', error);
      }
    );
  }
}
