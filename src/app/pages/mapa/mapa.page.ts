import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GoogleMap } from '@angular/google-maps';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule,
    GoogleMap,
    NavbarComponent,
  ]
})
export class MapaPage implements OnInit, AfterViewInit {
  map!: google.maps.Map;
  service!: google.maps.places.PlacesService;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const mapElement = document.getElementById('map');

    if (mapElement) {
      this.map = new google.maps.Map(mapElement, {
        center: { lat: 17.06052, lng: -96.72538 }, // Oaxaca
        zoom: 14
      });

      this.service = new google.maps.places.PlacesService(this.map);

      // Buscar lugares al cargar el mapa
      this.buscarLugares(['hospital', 'pharmacy']);
    }
  }

  buscarLugares(tipos: string[]) {
    tipos.forEach(tipo => {
      const request = {
        location: this.map.getCenter(),
        radius: 5000, // Radio de búsqueda en metros
        type: tipo
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            if (place.geometry?.location) {
              new google.maps.Marker({
                position: place.geometry.location,
                map: this.map,
                title: place.name
              });
            }
          });
        }
      });
    });
  }
}
