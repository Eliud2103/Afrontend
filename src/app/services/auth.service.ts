import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  login(fullName:string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { fullName,email, password }).pipe(
      tap((response) => {
        // Asegúrate de que response.accessToken exista y sea válido
        if (response && response.accessToken) {
          // Almacenar el token y los demás datos necesarios en localStorage
          this.setToken(response.accessToken);
        } else {
          console.error('No se recibió token de autenticación');
        }
      })
    );
  }

  // Método para hacer la solicitud de registro
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Método para guardar el token y datos en localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    //localStorage.setItem('authName', name);
   // localStorage.setItem('authEmail', email);
  }

  // Método para recuperar el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para hacer logout y limpiar el token
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authName');
    localStorage.removeItem('authEmail');
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
    console.log('Llamando a:', `${this.apiUrl}/profile`);
    console.log('Token:', token);
    return this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
