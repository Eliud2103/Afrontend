import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, AlertController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarFormsComponent } from 'src/app/components/navbar-forms/navbar-forms.component';
import { SiTienesCuentaComponent } from 'src/app/components/si-tienes-cuenta/si-tienes-cuenta.component';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-far-register3',
  templateUrl: './far-register3.page.html',
  styleUrls: ['./far-register3.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonLabel, IonInput, IonButton, IonContent, CommonModule, FormsModule, ReactiveFormsModule, NavbarFormsComponent, SiTienesCuentaComponent]
})
export class FarRegister3Page implements OnInit {

  far_register3: FormGroup = new FormGroup({});
  selectedImage: File | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const farmaciaDataStep2 = JSON.parse(localStorage.getItem('farmaciaStep2') || '{}');

    this.far_register3 = this.fb.group({
      email_farmacia: ['', [Validators.required, Validators.email]],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      descripcion: ['']
    });

    const savedFarmacia = localStorage.getItem('farmaciaData');
    if (savedFarmacia) {
      const savedData = JSON.parse(savedFarmacia);
      this.far_register3.setValue({
        email_farmacia: savedData.email_farmacia || '',
        mision: savedData.mision || '',
        vision: savedData.vision || '',
        descripcion: savedData.descripcion || ''
      });
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) {
      console.warn('⚠ No se seleccionó ninguna imagen');
      return;
    }
    this.selectedImage = file;
  }

  async register() {
    if (this.far_register3.invalid) {
      this.presentAlert('Error', 'Por favor, complete todos los campos correctamente.');
      return;
    }

    let imageUrl: string = '';
    if (this.selectedImage) {
      try {
        const response = await this.authService.uploadImage(this.selectedImage).toPromise();
        imageUrl = response || '';
      } catch (error) {
        this.presentAlert('Error', 'Error al subir la imagen');
        return;
      }
    }

    const farmaciaData = {
      ...this.far_register3.value,
      img: imageUrl,
    };

    this.authService.far_register(farmaciaData).subscribe({
      next: () => {
        this.presentAlert('Éxito', 'Registro exitoso');
        this.far_register3.reset();
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.presentAlert('Error', 'Error al registrar farmacia');
      }
    });
  }

  async finalizeRegistration() {
    if (this.far_register3.invalid) {
      this.presentAlert('Error', 'Por favor, complete todos los campos correctamente.');
      return;
    }

    const savedStep1 = JSON.parse(localStorage.getItem('farmaciaStep1') || '{}');
    const savedStep2 = JSON.parse(localStorage.getItem('farmaciaStep2') || '{}');

    if (!savedStep1 || !savedStep2) {
      this.presentAlert('Error', 'Datos incompletos. Asegúrate de que todos los pasos estén completados.');
      return;
    }

    let imageUrl: string = '';
    if (this.selectedImage) {
      try {
        imageUrl = (await this.authService.uploadImage(this.selectedImage).toPromise()) ?? '';
      } catch (error) {
        this.presentAlert('Error', 'Error al subir la imagen');
        return;
      }
    }

    const allData = {
      ...savedStep1,
      ...savedStep2,
      ...this.far_register3.value,
      img: imageUrl,
    };

    this.authService.far_register(allData).subscribe({
      next: () => {
        this.presentAlert('Éxito', 'Registro exitoso');
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.presentAlert('Error', 'Error al registrar farmacia');
      }
    });
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
