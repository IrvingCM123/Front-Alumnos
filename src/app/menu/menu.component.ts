import { Component, OnInit } from '@angular/core';
import { MandarDatosQR } from './MandarDatos.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public DatosQR: string = '';

  private Alumno = 'Irving Rafael Conde Marín';
  private Materia = '213642';
  private Matricula = 'zS20006735';

  public Token: any;
  public nrc$: any | string;
  public materias$: any | string;
  public Materias: any | string;

  constructor(
    private mandar: MandarDatosQR,
    private mostrar: Location,
    private http: HttpClient
  ) { }

  MandarDatos() {
    this.mandar.setMatricula(this.Matricula);
    this.mandar.setNombre(this.Alumno);
    this.mostrar.go;
  }

  async ngOnInit() {
    this.Token = 1;
    await this.obtener_nrcMaterias(this.Token);
  }

  async obtener_nrcMaterias(Token: string) {
    this.http.post('http://localhost:3000/Servidor/VerMateriaDocente', {})
      .subscribe(
        (data: any) => {
          this.nrc$ = data;
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  async obtener_Materias(materia: any) {
    this.http.post('http://localhost:3000/Servidor/VerMateriaDocente', {})
      .subscribe(
        (data: any) => {
          this.materias$ = data;
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
      this.Materias = this.materias$
  }
}
