import { Component, OnInit } from '@angular/core';
import { MandarDatosQR } from './MandarDatos.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FirestoreService } from '../servicios/FirestoreListas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public DatosQR: string = '';
  private Alumno = '';
  private Matricula = '';
  private Datos: any;
  public Token: any;
  public TokenNRC: any;
  public nrc$: any | Observable<any>;
  public materias$: any | Observable<any>;
  public Materias: any;

  constructor(
    private mandar: MandarDatosQR,
    private mostrar: Location,
    private http: HttpClient,
    private datosLocales: FirestoreService,
    private router: Router,
  ) {}

  MandarDatos() {
    this.obener_Datos(this.Token); // Obtener los datos después de la redirección
    this.router.navigate(['/Mostrar']); // Redireccionar al path "Mostrar"
    this.mandar.setMatricula(this.Matricula);
    this.mandar.setNombre(this.Alumno);
    this.mostrar.go;
  }

  async ngOnInit() {
    this.Token = this.datosLocales.obtener_DatoLocal('Resp');
    this.nrc$ = this.obtener_nrcMaterias(this.Token);
    await this.obener_Datos(this.Token);
    this.TokenNRC = await this.generarToken(this.nrc$);
    this.materias$ = this.obtener_Materias(this.TokenNRC.token);
  }

  async obener_Datos(Token: string) {
    const headers = {
      Authorization: Token,
    };
    try {
      const response: any = await this.http
        .get('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/', { headers })
        .toPromise();
      this.Datos = response.data;
      this.Alumno = this.Datos.nombres + ' ' + this.Datos.apellidos;
      this.Matricula = this.Datos.matricula;
    } catch (error) {
      console.error(error);
    }
  }

  obtener_nrcMaterias(Token: string) {
    const headers = {
      Authorization: Token,
    };
    return this.http
      .get('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/MateriasAlumno', { headers });
  }

  obtener_Materias(materia: any) {
    const headers = {
      Authorization: materia,
    };
    return this.http
      .get('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/materias', { headers });
  }

  generarToken(valor: string | any) {
    return this.http
      .post('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/generarToken', valor)
      .toPromise();
  }
}
