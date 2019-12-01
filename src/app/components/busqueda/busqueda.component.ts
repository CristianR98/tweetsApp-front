import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Tweet } from 'src/app/classes/tweet.class';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  tweets:Tweet[]

  cargando:boolean
  animacion:boolean

  message:string

  termino = new FormControl('',Validators.required)

  constructor(
    private httpService:HttpService,
    private activatedRouter:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.message = null
    this.cargando = true
    this.animacion = false
    this.activatedRouter.queryParamMap.subscribe( (query:any) => {
      if (!query.params.termino) {

        let termino = localStorage.getItem('ultimaBusqueda') || ''

        if (termino == '') {
          this.cargando = false
          return
        }

        this.termino.setValue(termino)
        this.buscar()
        return

      }

      this.termino.setValue(query.params.termino)
      
      if (this.termino.value !== '') {

        this.tweets = null
    
        this.httpService.getInitialTweets(this.termino.value).subscribe(resp => {
          console.log(resp)
          if (!resp.ok) {

            this.cargando = false
            this.message = resp.message
            return

          }

          this.tweets = []
          this.agregarNewTweets(resp.content)
    
        })
      }


    })
  }

  ngOnDestroy() {

    localStorage.setItem('ultimaBusqueda',this.termino.value)

  }

  buscar() {
    this.cargando = true
    if (!this.termino.valid) {
      return
    }
    this.router.navigate(['busqueda'],{queryParams:{termino:this.termino.value}})

  }

  verMas() {
    this.cargando = true
    this.httpService.getMasTweets().subscribe( resp => {
    
      if (!resp.ok) {
        this.message = resp.message
        return
      }

      this.agregarNewTweets(resp.content)

    })

  }

  private agregarNewTweets(tweets:Tweet[]) {
    this.animacion = true
    this.cargando = false
    let index = 0;
    let interval = setInterval(() => {
      if (index < tweets.length) {
        this.tweets.push(tweets[index])
        index++
        console.log(index, tweets.length)
      }else {
        clearInterval(interval)
        this.animacion = false
      }
    },100)
  }

}
