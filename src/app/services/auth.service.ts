import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface AuthResponse {
  accessToken: string;
  name: string;
  emailchido: string; // Asegúrate de que el backend devuelva estos datos
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';  // URL base de tu API backend

  constructor(private http: HttpClient) {}

  // Método para hacer la solicitud de login
  login(email: string, password: string) {
    return this.http.post<{ accessToken: string; role: string; fullName: string; email: string }>(
      'http://localhost:3000/auth/login',
      { email, password }
    ).pipe(
      tap((response) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('role', response.role);
        localStorage.setItem('userName', response.fullName); // Guardar el nombre real del usuario
      })
    );
  }

  // Método para hacer la solicitud de registro
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para guardar el token y datos en localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para recuperar el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para hacer logout y limpiar el token
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Método para verificar si hay un usuario autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();  // Si hay un token, consideramos al usuario como autenticado
  }

  // Método para obtener el perfil del usuario
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return throwError('No se encontró el token de autenticación');
    }

    return this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(catchError(this.handleError));
  }

  // Método para cambiar la contraseña
  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.put(`${this.apiUrl}/change-password`, {
      correo_electronico: email,
      contrasena_actual: currentPassword,
      nueva_contrasena: newPassword,
      confirmar_nueva_contrasena: newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('Ocurrió un error', error);
    return throwError(error);
  }

  /////////////////////////////////////////////////////////////////Hospitales/////////////////////////////////////////////////////////////
  hos_register(hospitalData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hos-register`, hospitalData).pipe(
      catchError(this.handleError)
    );
  }
  private handleHosRegisterError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.';
    if (error.status === 409) {
      errorMessage = 'El correo electrónico ya está en uso. Por favor, use un correo diferente.';
    }
    console.error('Error al registrar hospital', error);
    return throwError(errorMessage);
  }

  /////////////////////////////////////////////////////////////Farmacias///////////////////////////////////////////////////
  far_register(farmaciaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/far-register`, farmaciaData).pipe(
      catchError(this.handleFarRegisterError)
    );
  }

  // Manejo de errores para el registro de farmacias
  private handleFarRegisterError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.';
    if (error.status === 409) {
      errorMessage = 'El correo electrónico ya está en uso. Por favor, use un correo diferente.';
    }
    console.error('Error al registrar farmacia', error);
    return throwError(errorMessage);
  }

  /////////////////////////////////////////////////////////////Imágenes///////////////////////////////////////////////////
  // Método para subir una imagen (utilizando GridFS en el backend)
// En el AuthService
uploadImage(image: File): Observable<string> {
  const formData = new FormData();
  formData.append('image', image);

  return this.http.post<{ imageUrl: string }>('http://localhost:3000/auth/images/upload', formData)
    .pipe(
      map(response => response.imageUrl)  // Extraemos solo la URL
    );
}

  // Método para obtener una imagen por su nombre
  getImage(filename: string): Observable<Blob> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });


    return this.http.get(`http://localhost:3000/images/${filename}`, { headers, responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }
  //////////////////////////Mostrar hospitales/////////////////777
  getHospitalById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/auth/hospitales/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  getUserName(): string {
    return localStorage.getItem('userName') || 'Anónimo';
  }



}
