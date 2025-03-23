import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Farmacia } from '../interfaces/farmacia.model';

@Injectable({
  providedIn: 'root',
})
export class FarmaciaService {
  private _http=inject(HttpClient)
  private apiUrl = 'http://localhost:3000/farmacia'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de farmacias
  getFarmacias(): Observable<Farmacia[]> {
    return this.http.get<Farmacia[]>(`${this.apiUrl}/mostrar`);
  }

  // Método para obtener los detalles de una farmacia
  getFarmaciaDetails(id: string): Observable<Farmacia> {
    return this.http.get<Farmacia>(`${this.apiUrl}/${id}`);
  }


  // Método para actualizar la calificación de una farmacia
  updateRating(id: string, rating: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/rating`, { rating });
  }


  // Método para publicar un comentario en el backend
  publicarComentario(hospitalId: string, comentario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${hospitalId}/comentarios`, { comentario });
  }


   searchFarmacia(tipo: string) {
      return this._http.get<Farmacia[]>(`http://localhost:3000/farmacia/buscar?tipo=${tipo}`);
    }

}
