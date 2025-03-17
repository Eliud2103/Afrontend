import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Solo importa IonicModule
import { HospitalService } from 'src/app/services/hospital.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.page.html',
  styleUrls: ['./detail-card.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule, // Solo este módulo maneja todos los componentes de Ionic
    NavbarComponent
  ]
})
export class DetailCardPage implements OnInit {

  hospital: any = {};
  rating: number = 0;
  starIcon = star;
  starOutlineIcon = starOutline;
  comentarios: { usuario: string, texto: string }[] = [];
  comentarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private hospitalService: HospitalService,
    private fb: FormBuilder
  ) {
    this.comentarioForm = this.fb.group({
      comentario: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hospitalService.getHospitalDetails(id).subscribe(
        (data) => {
          this.hospital = data;
          this.comentarios = this.hospital.comentarios || [];
        },
        (error) => {
          console.error('Error al obtener detalles del hospital', error);
        }
      );
    }
  }

  setRating(index: number) {
    this.rating = index + 1;
  }

  publicarComentario() {
    if (this.comentarioForm.valid) {
      const nuevoComentario = this.comentarioForm.get('comentario')?.value;

      this.comentarios.push({
        usuario: 'Anónimo',
        texto: nuevoComentario
      });

      this.comentarioForm.reset();

      this.hospitalService.publicarComentario(this.hospital._id, nuevoComentario).subscribe({
        next: (response) => console.log('Comentario guardado en el backend', response),
        error: (err) => console.error('Error al guardar comentario:', err)
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
