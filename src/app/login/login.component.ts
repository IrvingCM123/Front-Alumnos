import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../servicios/FirestoreListas.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private datosLocales: FirestoreService,
    private router: Router,
    private location: Location,
    private http: HttpClient,
  ) {}

  username: string = '';
  password: string = '';
  loginFailed: boolean = false;
  loggedIn: boolean = false;
  public Token:any;
  responseSuccessful = false;

  async login(usuario: string, contraseña: string) {
    let response$;
    this.responseSuccessful = false;

    response$ = await this.http.post('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/IniciarSesion', [usuario,contraseña]).toPromise();
    console.log(response$)
    try {
      const Resp:any = await response$;
      this.datosLocales.guardar_DatoLocal('Resp', Resp.token);
      this.responseSuccessful = true;
    } catch (error) {
      this.responseSuccessful = false;
    }

    return this.responseSuccessful;
  }

  async IniciarSesion() {
    const loginSuccessful = await this.login(this.username, this.password);
    if (loginSuccessful) {
      this.datosLocales.Actualizar_Login(true);
      this.datosLocales.guardar_DatoLocal('login', true);
      this.router.navigate(['/Menu']);
      this.location.go;
    } else {
      this.datosLocales.Actualizar_Login(false);
      this.loginFailed = true;
      this.loggedIn = false;
    }
  }

  CrearCuenta() {
    this.datosLocales.Actualizar_Formulario('registro');
    this.datosLocales.guardar_DatoLocal('formulario', 'registro');
    this.location.go('/Registro');
    location.reload();
  }

  updateUsername(event: Event): void {
    this.username = (event.target as HTMLInputElement).value;
  }

  updatePassword(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
    this.datosLocales.Actualizar_Login(false);
  }
}
