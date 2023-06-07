import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms"
import { environment } from 'src/environments/environment.prod';


import { AngularFireAuthModule  } from '@angular/fire/compat/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QRCodeModule } from 'angularx-qrcode';

import { MenuComponent } from './menu/menu.component';
import { CodigoComponent } from './codigo/codigo.component';
import { HeaderComponent } from './header/header.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CodigoComponent,
    HeaderComponent,
    PerfilComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule,
    QRCodeModule,
    AngularFireAuthModule,
    FirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
