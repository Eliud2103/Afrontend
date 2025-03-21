import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HospitalService } from 'src/app/services/hospital.service';
import { FarmaciaService } from 'src/app/services/farmacia.service'; // Importa el servicio de farmacia
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { star, starOutline } from 'ionicons/icons';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.page.html',
  styleUrls: ['./detail-card.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    NavbarComponent
  ]
})
export class DetailCardPage implements OnInit {
  fullName: string = 'Invitado';  // Inicializar con 'Invitado'
  item: any = {};  // Puede ser tanto un hospital como una farmacia
  rating: number = 0;
  starIcon = star;
  starOutlineIcon = starOutline;
  comentarios: { usuario: string, texto: string }[] = [];
  comentarioForm: FormGroup;
  itemType: string = '';  // Determinar si es 'hospital' o 'farmacia'
  isAuthenticated: boolean = false;  // Verificación de autenticación

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router,
    private hospitalService: HospitalService,
    private farmaciaService: FarmaciaService,  // Servicio de farmacia
    private fb: FormBuilder
  ) {
    this.comentarioForm = this.fb.group({
      comentario: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Verificar si el usuario está autenticado
    this.isAuthenticated = this.authService.isAuthenticated();

    // Actualizar el nombre completo del usuario si está autenticado
    if (this.isAuthenticated) {
      // Asegúrate de que el nombre completo se obtiene correctamente desde localStorage
      this.fullName = localStorage.getItem('fullName') || 'Invitado';
      console.log('Nombre completo desde localStorage:', this.fullName);    // Usamos 'fullName'
    }

    const id = this.route.snapshot.paramMap.get('id');

    // Obtener 'type' desde el state de la navegación
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    this.itemType = navigationState?.['type'] || 'hospital'; // Obtener el tipo, si no está disponible, asigna 'hospital'

    // Recuperar la calificación guardada en localStorage
    const storedRating = localStorage.getItem(`${this.itemType}Rating`);
    if (storedRating) {
      this.rating = parseInt(storedRating, 10);
    }

    if (id) {
      if (this.itemType === 'hospital') {
        this.hospitalService.getHospitalDetails(id).subscribe(
          (data) => {
            this.item = data;
            this.comentarios = this.item.comentarios || [];
          },
          (error) => {
            console.error('Error al obtener detalles del hospital', error);
          }
        );
      } else if (this.itemType === 'farmacia') {
        this.farmaciaService.getFarmaciaDetails(id).subscribe(
          (data) => {
            this.item = data;
            this.comentarios = this.item.comentarios || [];
          },
          (error) => {
            console.error('Error al obtener detalles de la farmacia', error);
          }
        );
      }
    }
  }

  setRating(index: number) {
    // Si ya se ha hecho clic en la misma estrella, la calificación se borra
    if (this.rating === index + 1) {
      this.rating = 0; // Eliminar la calificación si la misma estrella se vuelve a hacer clic
      localStorage.removeItem(`${this.itemType}Rating`); // Eliminar la calificación de localStorage
    } else {
      this.rating = index + 1;
      localStorage.setItem(`${this.itemType}Rating`, this.rating.toString()); // Guardar el nuevo valor
    }
  }

  publicarComentario() {
    if (!this.isAuthenticated) {
      alert('Debes iniciar sesión para publicar un comentario');
      this.router.navigate(['/login']); // Redirigir a login si no está autenticado
      return;
    }

    if (this.comentarioForm.valid) {
      const nuevoComentario = this.comentarioForm.get('comentario')?.value;

      // Agregar el comentario al arreglo con el nombre del usuario (o 'Invitado')
      this.comentarios.push({
        usuario: this.fullName,  // Mostrar el nombre del usuario o 'Invitado' si no está logueado
        texto: nuevoComentario
      });

      this.comentarioForm.reset();

      // Publicar el comentario en el backend
      if (this.itemType === 'hospital') {
        this.hospitalService.publicarComentario(this.item._id, nuevoComentario).subscribe({
          next: (response) => console.log('Comentario guardado en el backend', response),
          error: (err) => console.error('Error al guardar comentario:', err)
        });
      } else if (this.itemType === 'farmacia') {
        this.farmaciaService.publicarComentario(this.item._id, nuevoComentario).subscribe({
          next: (response) => console.log('Comentario guardado en el backend', response),
          error: (err) => console.error('Error al guardar comentario:', err)
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
