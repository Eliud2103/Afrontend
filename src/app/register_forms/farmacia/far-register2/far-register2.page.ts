import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';

@Component({
  selector: 'app-far-register2',
  templateUrl: './far-register2.page.html',
  styleUrls: ['./far-register2.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, IonSelect, IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule, NavbarFormsComponent, SiTienesCuentaComponent]
})
export class FarRegister2Page implements OnInit {

  far_register2: FormGroup = new FormGroup({});

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    // Cargar los datos del paso 1 desde localStorage si existen
    const farmaciaDataStep1 = JSON.parse(localStorage.getItem('farmaciaStep1') || '{}');

    // Inicializar el formulario con valores existentes (si los hay)
    this.far_register2 = this.fb.group({
      nombre_farmacia: [farmaciaDataStep1.nombre_farmacia || '', Validators.required],
      tipo_farmacia: [farmaciaDataStep1.tipo_farmacia || '', Validators.required],
      numero_licencia_sanitaria: [farmaciaDataStep1.numero_licencia_sanitaria || '', Validators.required],
      direccion: [farmaciaDataStep1.direccion || '', Validators.required],
      telefono: [farmaciaDataStep1.telefono || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]] // Validación de teléfono (10 dígitos)
    });
  }

  goToNext() {
    if (this.far_register2.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    // Guardamos los datos en localStorage antes de cambiar de pantalla
    localStorage.setItem('farmaciaStep2', JSON.stringify(this.far_register2.value));

    // Navegamos a la siguiente pantalla
    this.router.navigate(['/far-register3']);
  }
}
