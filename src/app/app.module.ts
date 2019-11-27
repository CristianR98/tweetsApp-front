import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistorialComponent } from './components/historial/historial.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { APP_ROUTING } from './app.routes';
import { CardComponent } from './components/card/card.component';
import { HttpService } from './services/http.service';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HistorialComponent,
    BusquedaComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
