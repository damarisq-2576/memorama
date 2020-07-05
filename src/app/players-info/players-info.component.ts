import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-players-info',
  templateUrl: './players-info.component.html',
  styleUrls: ['./players-info.component.scss']
})
export class PlayersInfoComponent implements OnInit {
  @Input() points;
  @Input() turn:boolean;
  @Input() whoWin:string;
  @Input() winner:boolean;
  @Input() timeLeft:boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
