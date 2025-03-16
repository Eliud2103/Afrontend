import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = 'http://localhost:3000/hospital'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  getHospitales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mostrar`);
  }
}
