import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from 'src/app/classes/tweet.class';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() tweet:Tweet

  constructor() {}

  ngOnInit() {
  }

}
