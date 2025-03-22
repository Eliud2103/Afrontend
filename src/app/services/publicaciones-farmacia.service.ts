import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesFarmaciaService {
  private apiUrl = 'http://localhost:3000/farmacias/publicaciones';
  private uploadUrl = 'http://localhost:3000/farmacias/publicaciones/subir-imagen';

  constructor(private http: HttpClient) {}

 // Subir imagen y luego agregar la publicación de farmacia
agregarPublicacionFarmacia(
  titulo: string,
  descripcion: string,
  contenido: string,
  imgFile: File,
): Observable<any> {
  const formData = new FormData();
  formData.append('file', imgFile, imgFile.name);

  return this.http.post<{ url: string }>(this.uploadUrl, formData).pipe(
    switchMap(response => {
      const imgUrl = response.url;
      const publicacionData = { titulo, descripcion, contenido, img: imgUrl }; // 👈 Usa la categoría dinámica
      return this.http.post<any>(this.apiUrl, publicacionData);
    }),
    catchError(this.manejarError)
  );
}
  // 🔹 Método para eliminar una publicación
  eliminarPublicacion(publicacionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${publicacionId}`).pipe(
      catchError(this.manejarError)
    );
  }




  obtenerPublicacionesFarmacia(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.manejarError));
  }

  private manejarError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    return throwError(() => new Error('Error al procesar la solicitud'));
  }
}
