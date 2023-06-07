import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MandarDatosQR {
  NRC: string = "";
  Matricula: string = "";
  Nombre: string = "";

  setNrc(dato: any) {
    this.NRC = dato;
  }

  setNombre(dato: any) {
    this.Nombre = dato;
  }

  setMatricula(dato: any) {
    this.Matricula = dato;
  }

  getNrc() {
    return this.NRC
  }

  getMatricula() {
    return this.Matricula
  }

  getNombre() {
    return this.Nombre
  }


}
