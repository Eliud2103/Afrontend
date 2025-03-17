import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from '../interfaces/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private apiUrl = 'http://localhost:3000/hospital'; // Asegúrate de ajustar esta URL a tu configuración del backend

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de hospitales
  getHospitales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mostrar`);
  }
  getHospitalDetails(id: string): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.apiUrl}/${id}`);
  }

}
