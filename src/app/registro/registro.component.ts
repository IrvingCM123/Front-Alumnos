import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../servicios/FirestoreListas.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  nombre_usuario: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmar_contrasena: string = '';
  matricula: number = 0;

  file: File | any = null;
  comparar: boolean = false;
  Mensaje_Contrasena = false;
  Mostrar_Mensaje = false;
  Mostrar_Mensaje_Cuenta = false;
  mostrarBotonAceptar: boolean = false;

  url_imagen: string | any;
  Cuenta: string[] | any;
  Mensaje_Cuenta: any;

  constructor(
    private datosLocales: FirestoreService,
    private location: Location,
    private storage: AngularFireStorage,
    private http: HttpClient
  ) {}

  async CrearCuenta() {
    this.compararContraseña(this.contrasena, this.confirmar_contrasena);
    await this.SubirImagenFirestore();

    this.Cuenta = [
      this.matricula,
      this.correo,
      this.contrasena,
      this.url_imagen,
    ];

    if (this.comparar == true) {
      //this.http.post('https://api-alumnos-service-alumnos-fermindra.cloud.okteto.net/', this.Cuenta)
      // this.http.post('http://localhost:3000/api/v1/estudiantes/crearCuenta'
      this.http.post('https://alumnos-service-alumnos-fermindra.cloud.okteto.net/api/v1/estudiantes/crearCuenta', {
          matricula: this.matricula,
          correo: this.correo,
          contrasena: this.contrasena,
          url_imagen: this.url_imagen,
        })
        .subscribe(
          (response) => {
            this.Mensaje_Cuenta = 'La cuenta ha sido creada con éxito';
            this.Mostrar_Mensaje_Cuenta = true;
            this.mostrarBotonAceptar = true;
          },
          (error) => {
            this.Mensaje_Cuenta = error.error;
            this.Mostrar_Mensaje_Cuenta = true;
            this.mostrarBotonAceptar = true;
          }
        );
    } else {
      this.Mensaje_Contrasena = true;
      setTimeout(() => {
        this.Mensaje_Contrasena = false;
      }, 4000);
    }
  }

  ocultarMensajeCuenta(): void {
    this.Mostrar_Mensaje_Cuenta = false;
    this.mostrarBotonAceptar = false;
  }

  async SubirImagenFirestore() {
    if (this.file) {
      const filePath = `images/${this.file.name}`;
      const fileRef = this.storage.ref(filePath);
      try {
        await this.storage.upload(filePath, this.file);
        const downloadUrl = await fileRef.getDownloadURL().toPromise();
        this.url_imagen = downloadUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  actualizarNombreUsuario(event: Event): void {
    this.nombre_usuario = (event.target as HTMLInputElement).value;
  }

  actualizarCorreo(event: Event): void {
    this.correo = (event.target as HTMLInputElement).value;
  }

  actualizarContrasena(event: Event): void {
    this.contrasena = (event.target as HTMLInputElement).value;
  }

  actualizarconfirmarContrasena(event: Event): void {
    this.confirmar_contrasena = (event.target as HTMLInputElement).value;
  }

  actualizarmatricula(event: Event): void {
    this.matricula = +(event.target as HTMLInputElement).value;
  }

  compararContraseña(contra1: string, contra2: string) {
    if (contra1 == contra2) {
      this.comparar = true;
    } else {
      this.comparar = false;
    }
  }

  GuardarImagen(event: any) {
    this.file = event.target.files[0];
    this.MostrarImagen(this.file);
  }

  MostrarImagen(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.url_imagen = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  IniciarSesion() {
    this.datosLocales.Actualizar_Formulario('login');
    this.datosLocales.guardar_DatoLocal('formulario', 'login');
    this.location.go('/Login');
    location.reload();
  }

  ngOnInit(): void {
    this.datosLocales.Actualizar_Login(false);
  }
}
