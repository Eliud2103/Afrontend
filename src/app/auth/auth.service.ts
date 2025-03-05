import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  accessToken: string;  // Suponiendo que el backend te devuelve un token
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*private apiUrl = 'http://localhost:3000/auth/login';  // URL de tu API backend

  constructor(private http: HttpClient) {}

  // Método para hacer la solicitud de login
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { email, password });
  }

  // Método para guardar el token en localStorage
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
  }*/
}
