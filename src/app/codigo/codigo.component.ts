import { Component, OnInit } from '@angular/core';
import { MandarDatosQR } from '../menu/MandarDatos.service';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.scss']
})
export class CodigoComponent implements OnInit {

  public DatosQR: string = '';
  Alumno = this.mandar.getNombre();
  Materia = this.mandar.getNrc();
  Matricula = this.mandar.getMatricula();

  constructor(private mandar: MandarDatosQR){

  }

  async ngOnInit() {
    this.DatosQR = this.Alumno + ',' + this.Matricula + ',Presente';
  }

}
