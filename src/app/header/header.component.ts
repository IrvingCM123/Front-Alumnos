import { Component } from '@angular/core';
import { FirestoreService } from '../servicios/FirestoreListas.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private datos_Locales: FirestoreService,
    private location: Location
  ) {}

  CerrarSesion() {
    this.datos_Locales.Actualizar_Login(false);
    this.datos_Locales.eliminarCacheNavegador();
    this.datos_Locales.Actualizar_Formulario(false);
    this.location.go('/Sistema/Registro');
  }

}
