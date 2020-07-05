import { Component, OnInit, Input, Output, EventEmitter, Inject, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-handle-cards',
  templateUrl: './handle-cards.component.html',
  styleUrls: ['./handle-cards.component.scss']
})
export class HandleCardsComponent implements OnInit {

  @Input() columnNumb;
  @Input() start;
  @Input() allCards;
  @Input() set unflipAll(unflip) {
    if (unflip) {
      for (let ctr = 0; ctr < this.allCards.length; ctr++) {
        document.getElementById("" + ctr + "").classList.remove("flipped");
      }
    }
  };

  @Output() activeCard: EventEmitter<any> = new EventEmitter();
  // Need to get input changes 
  @Input() set unflip(unflipCards) {
    if (unflipCards.length > 0) {
      this.unrotateCards(unflipCards)
    }
  };

  end: number;
  paintCards: any;
  cont: number;
  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.end = this.start + this.columnNumb;
    this.paintCards = this.allCards.slice(this.start, this.end);
    this.cont = this.start;
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes)
      this.paintCards = this.allCards.slice(this.start, this.end);
  }

  rotateCard(card, id, e) {
    // make sure click is in front div
    if (parseInt(e.currentTarget.id) === id) {
      // toggle comparison
      if (!e.currentTarget.classList.contains("flipped")) {
        e.currentTarget.classList.add("flipped");

        let cardInfo = {
          "card": card,
          "idDiv": id,
          "flipped": true,
          "evt": e.currentTarget
        }
        this.activeCard.emit(cardInfo);
      }
    }
  }

  unrotateCards(unflipCards = []) {
    Object.entries(unflipCards).forEach(([key, unflipCard]) => {
      if (unflipCard.revealed == false) {
        setTimeout(() => {
          unflipCard.evt.classList.remove("flipped");
        }, 1500)
      }
    });
  }
}
