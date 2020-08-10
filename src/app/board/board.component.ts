import { Component, OnInit } from '@angular/core';

interface CardInterface {
  id: number,
  idCard: number,
  revealed: boolean,
  touch: boolean,
  active: boolean
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  //global Board vars
  howMany = 20;
  allCards: Array<CardInterface>;

  //Player vars
  turn: boolean; // true-> Player1 || false -> Player2
  winner = false;
  pts = {
    ptsPlayer1: 0,
    ptsPlayer2: 0
  }
  whoWin: string;
  timePlayer = 6;
  timeLeft: number;
  interval;

  constructor() { }

  ngOnInit() {
    // init values
    this.turn = true;
    this.timeLeft = this.timePlayer;
    this.allCards = this.shuffleCards(this.createCards());
    this.startTimer();
  }

  createCards() {
    const initArr = Array.from(Array(this.howMany / 2), (_, index) => ({
      id: index,
      idCard: index + 1,
      revealed: false,
      touch: true,
      active: false
    }));
    //deep level copy
    const cloned = initArr.map(x => Object.assign({}, x));
    return [...initArr, ...cloned.reverse()];
  }

  shuffleCards(list) {
    let ctrl = list.length;
    let temp, index;

    while (ctrl > 0) {
      index = Math.floor(Math.random() * ctrl);
      ctrl--;
      temp = list[ctrl].idCard;
      list[ctrl].idCard = list[index].idCard;
      list[index].idCard = temp;
    }
    return list;
  }


  selectedCard(activeCard: any) {
    let contTurns = 0;
    let position = [];
    let cardsHistory = activeCard.filter((x, i) => {
      if (x.revealed === true && x.active === true) {
        contTurns++;
        position.push(i)
        return x;
      }
    });



    if (contTurns === 2  && (cardsHistory[0].id != cardsHistory[1].id)){

      let blockCards = activeCard.filter((x, i) => {
        if (x.revealed === false || x.active === false) {
          x.touch = false;
          return x;
        }
      });
      if (cardsHistory[0].idCard == cardsHistory[1].idCard) {
        if (this.turn) {
          this.pts.ptsPlayer1++;
        } else {
          this.pts.ptsPlayer2++;
        }
        this.getWinner();
        activeCard[position[0]].active = activeCard[position[1]].active = false;
        blockCards.map(x => x.touch=true);
      } else {
        setTimeout(() => {
          activeCard[position[0]].active = activeCard[position[1]].active = false;
          activeCard[position[0]].revealed = activeCard[position[1]].revealed = false;
          // change player turn
          this.turn = !this.turn;
          this.resetTimer();

          blockCards.map( x => {return x.touch=true});
        }, 1500)

      }
    }
  }

  getWinner() {
    if ((this.pts.ptsPlayer1 + this.pts.ptsPlayer2) == (this.howMany / 2)) {
      this.winner = true;
      clearInterval(this.interval);
      if (this.pts.ptsPlayer1 > this.pts.ptsPlayer2) {
        this.whoWin = "Player 1 is the winner";
        return
      }
      if (this.pts.ptsPlayer2 > this.pts.ptsPlayer1) {
        this.whoWin = "Player 2 is the winner";
        return
      }
      this.whoWin = "It's a Tie :O";
    }
  }

  resetPlay() {
    //init Vars
    this.whoWin = "";
    this.winner = false;
    this.pts.ptsPlayer1 = this.pts.ptsPlayer2 = 0;
    this.resetTimer();
    this.allCards = this.shuffleCards(this.createCards());
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.turn = !this.turn;
        // flip cards if necessary
        this.allCards.map((obj) => {
          if (obj.revealed === true && obj.active === true) {
            obj.active = false;
            obj.revealed = false;
          }
        })
        this.timeLeft = this.timePlayer;
      }
    }, 1000)

  }

  resetTimer() {
    this.timeLeft = this.timePlayer;
    clearInterval(this.interval);
    this.startTimer();
  }

}
