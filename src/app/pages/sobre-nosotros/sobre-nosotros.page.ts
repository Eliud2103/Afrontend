import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonIcon, IonImg, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.page.html',
  styleUrls: ['./sobre-nosotros.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonImg, IonIcon, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NavbarComponent]
})
export class SobreNosotrosPage implements OnInit {
  animationCtrl: any;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      this.animationCtrl.create()
        .addElement(card)
        .duration(600)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(20px)', 'translateY(0)')
        .delay(index * 100) // Retrasa cada tarjeta un poco
        .play();
    });
  }
}
