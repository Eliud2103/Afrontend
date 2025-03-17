import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private apiUrl = 'http://localhost:3000/images/upload'; // URL de tu endpoint de backend para subir imágenes

  constructor(private http: HttpClient) {}

  // Método para subir una imagen
  uploadImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<{ fileUrl: string }>(this.apiUrl, formData).pipe(
      map((response) => response) // Devuelve la URL del archivo subido
    );
  }
}
