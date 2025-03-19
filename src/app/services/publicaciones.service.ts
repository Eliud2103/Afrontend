import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private apiUrl = 'http://localhost:3000/publicaciones';
  private uploadUrl = 'http://localhost:3000/publicaciones/subir-imagen';

  constructor(private http: HttpClient) {}

  // 🔹 Método para subir imagen y luego agregar la publicación
  agregarPublicacion(titulo: string, descripcion: string, contenido: string, imgFile: File): Observable<any> {
    // Subir la imagen primero
    const formData = new FormData();
    formData.append('file', imgFile, imgFile.name);

    return this.http.post<{ url: string }>(this.uploadUrl, formData).pipe(
      switchMap(response => {
        const imgUrl = response.url;

        // Enviar la publicación con la URL de la imagen
        const publicacionData = { titulo, descripcion, contenido, img: imgUrl };
        return this.http.post<any>(this.apiUrl, publicacionData);
      }),
      catchError(this.manejarError)
    );
  }

  // 🔹 Método para obtener todas las publicaciones
  /*obtenerPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.manejarError)
    );
  }*/
    // Método para obtener todas las publicaciones
    obtenerPublicaciones(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }

  // 🔹 Manejo centralizado de errores
  private manejarError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    let mensajeError = 'Ocurrió un error inesperado';

    if (error.status === 0) {
      mensajeError = 'No hay conexión con el servidor';
    } else if (error.status >= 400 && error.status < 500) {
      mensajeError = `Error del cliente: ${error.error?.message || error.message}`;
    } else if (error.status >= 500) {
      mensajeError = 'Error del servidor, intenta más tarde';
    }

    return throwError(() => new Error(mensajeError));
  }

  subirImagen(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:3000/publicaciones/subir-imagen', formData);
  }

  obtenerPublicacionPorId(publicacionId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${publicacionId}`);
  }
  obtenerDetallePublicacion(id: string): Observable<any> {
    const url = `http://localhost:3000/publicaciones/detalle/${id}`; // Verifica que esta URL sea correcta
    return this.http.get<any>(url).pipe(
      catchError(this.manejarError)
    );
  }


}
