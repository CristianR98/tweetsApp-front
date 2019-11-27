import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Busqueda } from 'src/app/classes/busqueda.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historial:Busqueda[]

  constructor(
    private httpService:HttpService,
    private router:Router
  ) {}

  ngOnInit() {
    this.getBusquedas()
  }

  getBusquedas() {
    this.httpService.getBusquedas().subscribe( busquedas => {

      this.historial = busquedas.content

    })
  }

  deleteBusqueda(id:number) {
    this.httpService.deleteBusqueda(id).subscribe( data => {
      this.getBusquedas()
    })
  }

  irABusqueda(termino:string) {
    this.router.navigate(['busqueda'],{queryParams:{termino}})
  }

}
