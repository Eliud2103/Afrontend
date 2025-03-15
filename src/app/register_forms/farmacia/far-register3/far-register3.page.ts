import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';
import { AuthService } from 'src/app/services/auth.service';  // Cambiar a AuthService
import { StorageService } from 'src/app/services/storage.service';  // Asegúrate de que este servicio también esté bien configurado si es necesario

@Component({
  selector: 'app-far-register3',
  templateUrl: './far-register3.page.html',
  styleUrls: ['./far-register3.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, CommonModule, FormsModule, ReactiveFormsModule, NavbarFormsComponent, SiTienesCuentaComponent]
})
export class FarRegister3Page implements OnInit {

  far_register3: FormGroup = new FormGroup({});
  selectedImage: File | null = null;  // Variable para almacenar la imagen seleccionada

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,  // Usar AuthService para la subida de la imagen
    private storageService: StorageService  // Este servicio puede seguir siendo usado para otras operaciones si es necesario
  ) {}

  ngOnInit() {
    // Cargar los datos del paso 2 desde localStorage si existen
    const farmaciaDataStep2 = JSON.parse(localStorage.getItem('farmaciaStep2') || '{}');

    // Inicializar el formulario con valores predeterminados
    this.far_register3 = this.fb.group({
      email_farmacia: ['', [Validators.required, Validators.email]],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      descripcion: ['']
    });

    // Cargar los datos del paso 2 si están disponibles
    const savedFarmacia = localStorage.getItem('farmaciaData');
    if (savedFarmacia) {
      const savedData = JSON.parse(savedFarmacia);
      this.far_register3.setValue({
        email_farmacia: savedData.email_farmacia || '',
        mision: savedData.mision || '',
        vision: savedData.vision || '',
        descripcion: savedData.descripcion || ''
      });
      console.log('Datos cargados en far-register3:', this.far_register3.value);
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

  // Función para registrar una farmacia
  async register() {
    if (this.far_register3.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return; // Detener el registro si hay campos vacíos o incorrectos
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

    // Guardar los datos del paso 3
    const farmaciaData = {
      ...this.far_register3.value,  // Recoge los valores del formulario
      img: imageUrl,  // Solo enviamos la URL de la imagen o un string vacío si no hay imagen
    };

    console.log('📦 Datos enviados al backend:', farmaciaData);

    // Llamada al servicio para registrar la farmacia
    this.authService.far_register(farmaciaData).subscribe({
      next: (res) => {
        console.log('Farmacia registrada con éxito:', res);
        alert('Registro exitoso');
        this.far_register3.reset();
        localStorage.clear(); // Limpiar localStorage después del registro
        this.router.navigate(['/login']); // Redirigir al login
      },
      error: (err) => {
        console.error('❌ Error al registrar farmacia:', err);
        alert('Error al registrar farmacia');
      }
    });
  }

  // Función para finalizar el registro con validación
  async finalizeRegistration() {
    if (this.far_register3.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;  // Detener el registro si hay campos vacíos o incorrectos
    }

    // Recuperamos los datos de los formularios anteriores
    const savedStep1 = JSON.parse(localStorage.getItem('farmaciaStep1') || '{}');
    const savedStep2 = JSON.parse(localStorage.getItem('farmaciaStep2') || '{}');

    // Verificamos si los datos están completos
    if (!savedStep1 || !savedStep2) {
      alert('Datos incompletos. Asegúrate de que todos los pasos estén completados.');
      return;
    }

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

    // Combinamos todos los datos
    const allData = {
      ...savedStep1,
      ...savedStep2,
      ...this.far_register3.value,
      img: imageUrl, // Aseguramos que siempre haya un string
    };

    console.log('🚀 Enviando datos completos:', allData);

    // Llamada a la API para registrar la farmacia
    this.authService.far_register(allData).subscribe({
      next: (res) => {
        console.log('Farmacia registrada con éxito:', res);
        alert('Registro exitoso');
        // Limpiar localStorage después del registro
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Error al registrar farmacia:', err);
        alert('Error al registrar farmacia');
      }
    });
  }
}
