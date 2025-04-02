import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-mapa-far',
  templateUrl: './mapa-far.page.html',
  styleUrls: ['./mapa-far.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,NavbarComponent, CommonModule, FormsModule]
})
export class MapaFarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
