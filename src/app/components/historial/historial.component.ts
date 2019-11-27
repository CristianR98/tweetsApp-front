import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Busqueda } from 'src/app/classes/busqueda.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historial:Busqueda[] = []
  eliminar:boolean

  @ViewChild('links',{static:true}) links

  constructor(
    private httpService:HttpService,
    private router:Router
  ) {}

  ngOnInit() {
    console.log(this.links)
    this.getBusquedas()
  }

  getBusquedas() {
    this.httpService.getBusquedas().subscribe( busquedas => {

      let index = 0;
      let interval = setInterval(() => {
        if (index < busquedas.content.length) {
          this.historial.push(busquedas.content[index])
          index++
        }else {
          clearInterval(interval)
        }
      },50)

    })
  }

  deleteBusqueda(id:number, index:number) {
    this.httpService.deleteBusqueda(id).subscribe( data => {
      if (!data.ok) {
        return
      }
      this.links.nativeElement.children[index].classList.add('eliminar')
      setTimeout(() => {
        this.historial.splice(index,1)
      }, 500);
    })
  }

  irABusqueda(termino:string) {
    this.router.navigate(['busqueda'],{queryParams:{termino}})
  }

}
