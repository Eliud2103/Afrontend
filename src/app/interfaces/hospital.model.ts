// src/app/models/hospital.model.ts

export interface Responsable {
  nombre_responsable: string;
  apellido_paterno_responsable: string;
  apellido_materno_responsable: string;
  email_responsable: string;
  telefono_responsable: string;
  password: string;
}

export interface Hospital {
  _id: string;
  nombre_hospital: string;
  tipo_hospital: string;
  numero_licencia_sanitaria: string;
  direccion: string;
  telefono?: string;
  email_hospital: string;
  password: string;
  descripcion?: string;
  img: string;
  responsable: Responsable;
}
