import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.page.html',
  styleUrls: ['./sobre-nosotros.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NavbarComponent]
})
export class SobreNosotrosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
