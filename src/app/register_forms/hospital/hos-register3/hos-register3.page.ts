import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';  // Asegúrate de importar el servicio de Storage

@Component({
  selector: 'app-hos-register3',
  templateUrl: './hos-register3.page.html',
  styleUrls: ['./hos-register3.page.scss'],
  standalone: true,
  imports: [SiTienesCuentaComponent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, CommonModule, FormsModule, ReactiveFormsModule, NavbarFormsComponent]
})
export class HosRegister3Page implements OnInit {

  hos_register3: FormGroup = new FormGroup({});
  selectedImage: File | null = null; // Variable para almacenar la imagen seleccionada

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService  // Inyectamos el servicio de almacenamiento
  ) {}

  ngOnInit() {
    const hospitalDataStep2 = JSON.parse(localStorage.getItem('hospitalStep2') || '{}');

    // Inicializamos el formulario con el FormBuilder
    this.hos_register3 = this.fb.group({
      email_hospital: ['', [Validators.required, Validators.email]],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      descripcion: ['']
    });

    // Cargar datos almacenados de la página anterior
    const savedHospital = localStorage.getItem('hospitalData');
    if (savedHospital) {
      const savedData = JSON.parse(savedHospital);
      this.hos_register3.setValue({
        email_hospital: savedData.email_hospital || '',
        mision: savedData.mision || '',
        vision: savedData.vision || '',
        descripcion: savedData.descripcion || ''
      });
      console.log('Datos cargados en hos-register3:', this.hos_register3.value);
    }
  }

  // Función para manejar la selección de la imagen
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) {
      console.warn('⚠ No se seleccionó ninguna imagen');
      return;
    }
    this.selectedImage = file;
    if (this.selectedImage) {
      console.log('📷 Imagen seleccionada:', this.selectedImage.name);
    }
  }

  // Función para registrar un hospital
  async register() {
    if (this.hos_register3.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    let imageUrl: string = '';  // Variable para almacenar la URL de la imagen
    if (this.selectedImage) {
      try {
        console.log('📸 Imagen seleccionada:', this.selectedImage.name);
        // Usar el servicio AuthService para subir la imagen
        const response = await this.authService.uploadImage(this.selectedImage).toPromise();
        imageUrl = response || '';  // Suponemos que response es la URL de la imagen
        console.log('✅ URL de la imagen generada:', imageUrl);
      } catch (error) {
        console.error('❌ Error al subir la imagen:', error);
        alert('Error al subir la imagen');
        return;  // Si ocurre un error, detener el proceso
      }
    }

    const hospitalData = {
      ...this.hos_register3.value,  // Recoge los valores del formulario
      img: imageUrl,  // Solo enviamos la URL de la imagen o un string vacío si no hay imagen
    };

    console.log('📦 Datos enviados al backend:', hospitalData);

    // Llamada al servicio para registrar el hospital
    this.authService.hos_register(hospitalData).subscribe({
      next: (res) => {
        console.log('🏥 Hospital registrado con éxito:', res);
        alert('Registro exitoso');
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Error en la API:', err);
        alert('Error al registrar hospital');
      }
    });
  }

  // Función para finalizar el registro con validación
  async finalizeRegistration() {
    if (this.hos_register3.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    // Recuperar datos previos del localStorage
    const savedStep1 = JSON.parse(localStorage.getItem('hospitalStep1') || '{}');
    const savedStep2 = JSON.parse(localStorage.getItem('hospitalStep2') || '{}');

    if (!savedStep1 || !savedStep2) {
      alert('Datos incompletos. Asegúrate de que todos los pasos estén completados.');
      return;
    }

    // Subir la imagen si hay una seleccionada
    let imageUrl: string = ''; // Aseguramos que sea de tipo string
    if (this.selectedImage) {
      try {
        // Usar el operador de coalescencia nula (??) para asignar un valor predeterminado
imageUrl = (await this.authService.uploadImage(this.selectedImage).toPromise()) ?? '';

        console.log('✅ Imagen subida con éxito:', imageUrl);
      } catch (error) {
        console.error('❌ Error al subir la imagen:', error);
        alert('Error al subir la imagen');
        return; // Si hay error, detenemos el proceso
      }
    }

    // Combinamos todos los datos e incluimos la URL de la imagen
    const allData = {
      ...savedStep1,
      ...savedStep2,
      ...this.hos_register3.value,
      img: imageUrl || '', // Aseguramos que siempre haya un string
    };

    console.log('🚀 Enviando datos completos:', allData);

    // Llamada a la API para registrar el hospital
    this.authService.hos_register(allData).subscribe({
      next: (res) => {
        console.log('✅ Hospital registrado con éxito:', res);
        alert('Registro exitoso');
        localStorage.clear(); // Limpiar localStorage
        this.router.navigate(['/login']); // Redirigir al login
      },
      error: (err) => {
        console.error('❌ Error al registrar hospital:', err);
        alert('Error al registrar hospital');
      }
    });
  }
}
