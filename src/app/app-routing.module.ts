import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CodigoComponent } from './codigo/codigo.component';
import { RegistroComponent } from './registro';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'Registro', pathMatch: 'full'},
  { path: 'Registro', component: RegistroComponent },
  { path: 'Login', component: LoginComponent},
  { path: 'Menu', component: MenuComponent},
  { path: 'Mostrar', component: CodigoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
