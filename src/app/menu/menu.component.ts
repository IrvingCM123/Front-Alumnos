import { Component, OnInit } from '@angular/core';
import { MandarDatosQR } from './MandarDatos.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FirestoreService } from '../servicios/FirestoreListas.service';

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
  public nrc$: any | string;
  public materias$: any | string;
  public Materias: any | string;

  constructor(
    private mandar: MandarDatosQR,
    private mostrar: Location,
    private http: HttpClient,
    private datosLocales: FirestoreService,
    private router: Router,
  ) { }

  MandarDatos() {
    this.obener_Datos(this.Token); // Obtener los datos después de la redirección
    this.router.navigate(['/Mostrar']); // Redireccionar al path "Mostrar"
    this.mandar.setMatricula(this.Matricula);
    this.mandar.setNombre(this.Alumno);
    this.mostrar.go;
  }

  async ngOnInit() {
    this.Token = this.datosLocales.obtener_DatoLocal('Resp');
    await this.obtener_nrcMaterias(this.Token);
    await this.obener_Datos(this.Token);
    await this.generarToken(this.nrc$.nrcs);
    await this.obtener_Materias(this.TokenNRC.token);
  }

  async obener_Datos(Token: string) {
    const headers = {
      Authorization: Token,
    };
    // this.http.get('https://api-alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/', {})
    // this.http.get('http://localhost:3000/api/v1/estudiantes/'
    this.Datos = await new Promise((resolve, reject) => { this.http.get('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/', { headers: headers })
      .subscribe(
          (Resp: any) => {
            resolve(Resp);
          },
          (error: any) => {
            reject(error);
          }
        );
    });
    this.Alumno = this.Datos.data.nombres + ' ' + this.Datos.data.apellidos;
    this.Matricula = this.Datos.data.matricula;
  }

  async obtener_nrcMaterias(Token: string) {
    const headers = {
      Authorization: Token,
    };
    //this.http.get('https://api-alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/MateriasAlumno', {})
    //http://localhost:3000/api/v1/estudiantes/MateriasAlumno
    this.nrc$ = await new Promise((resolve, reject) => {
      this.http.get('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/MateriasAlumno', {
          headers: headers,
        })
        .subscribe(
          (Resp: any) => {
            resolve(Resp);
          },
          (error: any) => {
            reject(error);
          }
        );
    });

    
  }

  async obtener_Materias(materia: any) {
    const headers = {
      Authorization: materia,
    };
    //this.http.get('https://api-alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/', {})
    //this.http.get('http://localhost:3000/api/v1/estudiantes/materias'
    this.materias$ = await new Promise((resolve, reject) => {
      this.http.get('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/materias', { headers: headers, })
      .subscribe(
        (Resp: any) => {
          resolve(Resp);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
    this.Materias = this.materias$;
  }

  async generarToken(valor: string | any) {
    this.TokenNRC = await new Promise((resolve, reject) => {
      //http://localhost:3000/api/v1/estudiantes/generarToken
      this.http.post('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/generarToken', valor)
        .subscribe(
          (Resp: any) => {
            resolve(Resp);
          },
          (error: any) => {
            reject(error);
          }
        );
    });
  }
}
