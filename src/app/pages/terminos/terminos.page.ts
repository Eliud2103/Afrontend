import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TerminosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  volver() {
    this.router.navigate(['/home']); // Ajusta la ruta a donde debe volver el usuario
  }


}
