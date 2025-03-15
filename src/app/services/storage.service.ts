import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private apiUrl = 'http://localhost:3000/auth/images/upload'; // La URL de tu endpoint de backend

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<{ imageUrl: string }>(this.apiUrl, formData)
      .pipe(
        map(response => response.imageUrl) // Extrae solo la URL de la respuesta
      );
  }
}
