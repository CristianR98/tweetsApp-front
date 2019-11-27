import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Tweet } from 'src/app/classes/tweet.class';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  tweets:Tweet[]

  cargando:boolean = true

  termino = new FormControl('')

  constructor(
    private httpService:HttpService,
    private activatedRouter:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.cargando = true
    this.activatedRouter.queryParamMap.subscribe( (query:any) => {
      
      if (!query.params.termino) {
        let termino = localStorage.getItem('ultimaBusqueda') || ''
        if (termino == '') {
          this.cargando = false
          return
        }
        this.termino.value = termino
        this.buscar()
        return
      }

      this.termino.value = query.params.termino
      
      if (this.termino.value !== '') {
        this.tweets = null
    
        this.httpService.getInitialTweets(this.termino.value).subscribe(resp => {
          
          this.tweets = resp.content
          
          this.cargando = false
    
        })
      }


    })
  }

  ngOnDestroy() {

    localStorage.setItem('ultimaBusqueda',this.termino.value)

  }

  buscar() {
    
    this.cargando = true
    this.router.navigate(['busqueda'],{queryParams:{termino:this.termino.value}})

  }

  verMas() {
    this.cargando = true
    this.httpService.getMasTweets().subscribe( resp => {
    
      // for (let i = 0; i < resp.content.length; i++) {

      //   let hayTweet = resp.content.find(tweet => tweet.id == resp.content[i].id)
      //   if (!hayTweet) {
      //     this.tweets.push(resp.content[i])
      //   }

      // }

      this.tweets = resp.content

      this.cargando = false

    })
  }

}
