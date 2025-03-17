import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [CommonModule,ReactiveFormsModule, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
