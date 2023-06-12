import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../servicios/FirestoreListas.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public Docente_ID: string = "";
  response$: any;

  constructor(
    private datos_Locales: FirestoreService,
    private http: HttpClient
  ) { }

  N_Personal: string | any;
  datos: any;
  public token: string | any;

  async ngOnInit() {

    this.token = this.datos_Locales.obtener_DatoLocal('Resp');
    await this.getDocenteByID(this.token);
  }

  async getDocenteByID(Token: any) {
    const headers = {
      'Authorization': Token
    }
    //this.http.get('https://api-alumnos-service-alumnos-fermindra.cloud.okteto.net/' , {headers: headers})
    this.http.get('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/', {headers: headers})
    .subscribe(
        (data: any) => {
          this.datos = data.data;
          console.log(this.datos)
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
}
