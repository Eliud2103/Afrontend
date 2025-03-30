import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from '../interfaces/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private _http=inject(HttpClient)
  private apiUrl = 'http://localhost:3000/hospital';
  private uploadUrl = 'http://localhost:3000/hospital/subir-imagen'; // Asegúrate de ajustar esta URL a tu configuración del backend

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de hospitales
  getHospitales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mostrar`);
  }

  // Método para obtener detalles de un hospital específico
  getHospitalDetails(id: string): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.apiUrl}/${id}`);
  }

  // Enviar nueva calificación
  updateRating(id: string, rating: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/rating`, { rating });
  }

  // Método para publicar un comentario en el backend
  publicarComentario(hospitalId: string, comentario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${hospitalId}/comentarios`, { comentario });
  }



// Método para eliminar un hospital
eliminarHospital(hospitalId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${hospitalId}`);
}



  searchHospital(tipo: string) {
    return this._http.get<Hospital[]>(`http://localhost:3000/hospital/buscar?tipo=${tipo}`);
  }
  subirImagen(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:3000/hospital/subir-imagen', formData);
  }


}
