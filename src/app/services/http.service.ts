import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Busqueda } from '../classes/busqueda.class';
import { Respuesta } from '../classes/respuesta.class';
import { Tweet } from '../classes/tweet.class';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url:string = 'http://localhost:8080/tweetsapp/'
  private index:number = 0
  private ultimoTermino:string

  constructor(
    private http:HttpClient
  ) {}

  public getBusquedas():Observable<Respuesta<Busqueda[]>> {
    let url:string = this.url + `getBusquedas`
    return this.http.get<Respuesta<Busqueda[]>>(url)
  }

  public getMasTweets():Observable<Respuesta<Tweet[]>> {
    this.index += 10
    return this.getTweets(this.ultimoTermino)
  }

  public getInitialTweets(termino:string):Observable<Respuesta<Tweet[]>> {
    this.index = 10
    this.ultimoTermino = termino
    return this.getTweets(termino)
  }

  private getTweets(termino:string):Observable<Respuesta<Tweet[]>> {
    let url:string = this.url + `busqueda?termino=${termino}&cantidad=${this.index}`
    return this.http.get<Respuesta<Tweet[]>>(url).pipe(
      map(resp => {
        if (!resp.ok) {
          return resp
        }
        for (let i = 0; i < resp.content.length; i++) {
          let fechas = resp.content[i].fecha.split('ART')
          resp.content[i].fecha = new Date(fechas[0] + fechas[1])
        }
        console.log(resp.content)
        return resp
      })
    )
  }
  
  public deleteBusqueda(id:number):Observable<Respuesta<string>> {
    let url:string = this.url + `deleteBusqueda?id=${id}`
    return this.http.get<Respuesta<string>>(url)
  }

}
