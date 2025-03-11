import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient

  ) {}

  // Método para hacer la solicitud de login
  login(fullName: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { fullName, email, password }).pipe(
      catchError(this.handleError)
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

}
