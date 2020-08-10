import { Component, Input, Output, EventEmitter } from '@angular/core';
interface CardInterface {
    id: number,
    idCard: number,
    revealed: boolean,
    touch: boolean,
    active: boolean
}

@Component({
  selector: 'app-handle-cards',
  templateUrl: './handle-cards.component.html',
  styleUrls: ['./handle-cards.component.scss']
})
export class HandleCardsComponent {
  @Input() allCards:CardInterface;
  @Output() activeCard: EventEmitter<CardInterface> = new EventEmitter();

  constructor() { }


  rotateCard(id) {
    // Set properties and correct id value to compare
    this.allCards[id].id = id;
    this.allCards[id].revealed = true;
    this.allCards[id].active = true;
    this.activeCard.emit(this.allCards);
  }

}
