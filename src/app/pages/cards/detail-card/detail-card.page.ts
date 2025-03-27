import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HospitalService } from 'src/app/services/hospital.service';
import { FarmaciaService } from 'src/app/services/farmacia.service';
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
  fullName: string = '';
  item: any = {};
  rating: number = 0;
  starIcon = star;
  starOutlineIcon = starOutline;
  comentarios: { usuario: string, texto: string }[] = [];
  comentarioForm: FormGroup;
  itemType: string = '';
  isAuthenticated: boolean = false;

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router,
    private hospitalService: HospitalService,
    private farmaciaService: FarmaciaService,
    private fb: FormBuilder
  ) {
    this.comentarioForm = this.fb.group({
      comentario: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.fullName = localStorage.getItem(this.fullName) || 'Invitado';
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log("¿Usuario autenticado?:", this.isAuthenticated);

    if (this.isAuthenticated) {
      this.fullName = localStorage.getItem('fullName') || 'Invitado';
    }

    const id = this.route.snapshot.paramMap.get('id');
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    this.itemType = navigationState?.['type'] || 'hospital';

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
          (error) => console.error('Error al obtener detalles del hospital', error)
        );
      } else if (this.itemType === 'farmacia') {
        this.farmaciaService.getFarmaciaDetails(id).subscribe(
          (data) => {
            this.item = data;
            this.comentarios = this.item.comentarios || [];
          },
          (error) => console.error('Error al obtener detalles de la farmacia', error)
        );
      }
    }
  }

  getWhatsAppLink(): string {
    const phone = this.item.telefono || this.item.telefono_farmacia;
    if (!phone) return '#'; // Si no hay número, evita el enlace roto

    const formattedPhone = phone.replace(/\D/g, ''); // Limpia el número (sin espacios ni símbolos)
    return `https://wa.me/${formattedPhone}`; // Enlace de WhatsApp con el número
  }

  setRating(index: number) {
    if (this.rating === index + 1) {
      this.rating = 0;
      localStorage.removeItem(`${this.itemType}Rating`);
    } else {
      this.rating = index + 1;
      localStorage.setItem(`${this.itemType}Rating`, this.rating.toString());
    }
  }

  publicarComentario() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.comentarioForm.valid) {
      const nuevoComentario = this.comentarioForm.get('comentario')?.value;
      this.comentarios.push({ usuario: this.fullName, texto: nuevoComentario });
      this.comentarioForm.reset();

      if (this.itemType === 'hospital') {
        this.hospitalService.publicarComentario(this.item._id, nuevoComentario).subscribe(
          (response) => console.log('Comentario guardado en el backend', response),
          (err) => console.error('Error al guardar comentario:', err)
        );
      } else if (this.itemType === 'farmacia') {
        this.farmaciaService.publicarComentario(this.item._id, nuevoComentario).subscribe(
          (response) => console.log('Comentario guardado en el backend', response),
          (err) => console.error('Error al guardar comentario:', err)
        );
      }
    }
  }
}
