export interface Responsable {
  nombre_responsable: string;
  apellido_paterno_responsable: string;
  apellido_materno_responsable: string;
  email_responsable: string;
  telefono_responsable: string;
  password: string;
}

export interface Farmacia {
  _id: string;
  nombre_farmacia: string;
  tipo_farmacia: string;
  numero_licencia_sanitaria: string;
  direccion: string;
  telefono?: string;
  email_farmacia: string;
  password: string;
  descripcion?: string;
  img: string;
  responsable: Responsable;
  mision: string;
  vision: string;
}
