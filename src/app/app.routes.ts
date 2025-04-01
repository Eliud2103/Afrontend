import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login-form/login-form.page').then( m => m.LoginFormPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./auth/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'cambio-pass',
    loadComponent: () => import('./auth/cambio-pass/cambio-pass.page').then( m => m.CambioPassPage)
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/sobre-nosotros/sobre-nosotros.page').then( m => m.SobreNosotrosPage)
  },
  {
    path: 'user-register1',
    loadComponent: () => import('./register_forms/user/register1/register1.page').then( m => m.Register1Page)
  },
  {
    path: 'par-register1',
    loadComponent: () => import('./register_forms/particular/par-register1/par-register1.page').then( m => m.ParRegister1Page)
  },
  {
    path: 'par-register2',
    loadComponent: () => import('./register_forms/particular/par-register2/par-register2.page').then( m => m.ParRegister2Page)
  },
  {
    path: 'hos-register1',
    loadComponent: () => import('./register_forms/hospital/hos-register1/hos-register1.page').then( m => m.HosRegister1Page)
  },
  {
    path: 'hos-register2',
    loadComponent: () => import('./register_forms/hospital/hos-register2/hos-register2.page').then( m => m.HosRegister2Page)
  },
  {
    path: 'hos-register3',
    loadComponent: () => import('./register_forms/hospital/hos-register3/hos-register3.page').then( m => m.HosRegister3Page)
  },
  {
    path: 'hos-register4',
    loadComponent: () => import('./register_forms/hospital/hos-register4/hos-register4.page').then( m => m.HosRegister4Page)
  },
  {
    path: 'far-register1',
    loadComponent: () => import('./register_forms/farmacia/far-register1/far-register1.page').then( m => m.FarRegister1Page)
  },
  {
    path: 'far-register2',
    loadComponent: () => import('./register_forms/farmacia/far-register2/far-register2.page').then( m => m.FarRegister2Page)
  },
  {
    path: 'far-register3',
    loadComponent: () => import('./register_forms/farmacia/far-register3/far-register3.page').then( m => m.FarRegister3Page)
  },
  {
    path: 'far-register4',
    loadComponent: () => import('./register_forms/farmacia/far-register4/far-register4.page').then( m => m.FarRegister4Page)
  },
  {
    path: 'par-register3',
    loadComponent: () => import('./register_forms/particular/par-register3/par-register3.page').then( m => m.ParRegister3Page)
  },
  {
    path: 'par-register4',
    loadComponent: () => import('./register_forms/particular/par-register4/par-register4.page').then( m => m.ParRegister4Page)
  },
  {
    path: 'cli-register1',
    loadComponent: () => import('./register_forms/clinica/cli-register1/cli-register1.page').then( m => m.CliRegister1Page)
  },
  {
    path: 'cli-register2',
    loadComponent: () => import('./register_forms/clinica/cli-register2/cli-register2.page').then( m => m.CliRegister2Page)
  },
  {
    path: 'cli-register3',
    loadComponent: () => import('./register_forms/clinica/cli-register3/cli-register3.page').then( m => m.CliRegister3Page)
  },
  {
    path: 'cli-register4',
    loadComponent: () => import('./register_forms/clinica/cli-register4/cli-register4.page').then( m => m.CliRegister4Page)
  },
  {
    path: 'lab-register1',
    loadComponent: () => import('./register_forms/laboratorio/lab-register1/lab-register1.page').then( m => m.LabRegister1Page)
  },
  {
    path: 'lab-register2',
    loadComponent: () => import('./register_forms/laboratorio/lab-register2/lab-register2.page').then( m => m.LabRegister2Page)
  },
  {
    path: 'lab-register3',
    loadComponent: () => import('./register_forms/laboratorio/lab-register3/lab-register3.page').then( m => m.LabRegister3Page)
  },
  {
    path: 'lab-register4',
    loadComponent: () => import('./register_forms/laboratorio/lab-register4/lab-register4.page').then( m => m.LabRegister4Page)
  },
  {
    path: 'hos-cards',
    loadComponent: () => import('./pages/cards/hos-cards/hos-cards.page').then( m => m.HosCardsPage)
  },
  {
    path: 'far-cards',
    loadComponent: () => import('./pages/cards/far-cards/far-cards.page').then( m => m.FarCardsPage)
  },
  {
    path: 'cli-cards',
    loadComponent: () => import('./pages/cards/cli-cards/cli-cards.page').then( m => m.CliCardsPage)
  },
  {
    path: 'par-cards',
    loadComponent: () => import('./pages/cards/par-cards/par-cards.page').then( m => m.ParCardsPage)
  },
  {
    path: 'lab-cards',
    loadComponent: () => import('./pages/cards/lab-cards/lab-cards.page').then( m => m.LabCardsPage)
  },

  {
    path: 'mi-perfil',
    loadComponent: () => import('./auth/mi-perfil/mi-perfil.page').then( m => m.MiPerfilPage)
  },
  {
    path: 'hos-form',
    loadComponent: () => import('./pages/publicaciones_forms/hospital/hos-form/hos-form.page').then( m => m.HosFormPage)
  },
  {
    path: 'hos-publicacion',
    loadComponent: () => import('./pages/show_publicaciones/hospital/hos-publicacion/hos-publicacion.page').then( m => m.HosPublicacionPage)
  },
  {
    path: 'detail-card/:id',
    loadComponent: () => import('./pages/cards/detail-card/detail-card.page').then( m => m.DetailCardPage)
  },

  {
    path: 'far-form',
    loadComponent: () => import('./pages/publicaciones_forms/farmacia/far-form/far-form.page').then( m => m.FarFormPage)
  },

  {
    path: 'far-publicacion',
    loadComponent: () => import('./pages/show_publicaciones/farmacia/far-publicacion/far-publicacion.page').then( m => m.FarPublicacionPage)
  },

  {
    path: 'detail-publicacion/:id',
    loadComponent: () => import('./pages/show_publicaciones/detail-publicacion/detail-publicacion.page').then( m => m.DetailPublicacionPage)
  },
  {
    path: 'mapa',
    loadComponent: () => import('./pages/mapa/mapa.page').then( m => m.MapaPage)
  },

  {
    path: 'admin-register',
    loadComponent: () => import('./register_forms/admin/admin-register/admin-register.page').then( m => m.AdminRegisterPage)
  },  {
    path: 'mis-datos',
    loadComponent: () => import('./auth/mis-datos/mis-datos.page').then( m => m.MisDatosPage)
  },





];
