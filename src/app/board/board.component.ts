import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  //global Board vars
  howMany = 20;
  colNum = 4;
  allCards = []; //  Y si se hace obj ?


  //Player vars
  turn: boolean; // true-> Player1 || false -> Player2
  winner = false;
  currentTurns: number; // each player flip card
  pts = {
    ptsPlayer1: 0,
    ptsPlayer2: 0
  }
  whoWin: string;
  timePlayer = 6;
  timeLeft: number;
  interval;
  // Reset handle
  unflipAll: boolean;
  // Temporary vars
  firstCardInfo: any;
  unflipCards = [];

  initArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  constructor() { }

  ngOnInit() {
    // init values
    this.turn = true;
    this.currentTurns = 2;
    this.timeLeft = this.timePlayer;
    this.allCards = this.shuffleCards(this.initArray);
    console.log(this.allCards)
    this.startTimer();
  }


  shuffleCards(list) {
    let ctrl = list.length;
    let temp, index;

    while (ctrl > 0) {
      index = Math.floor(Math.random() * ctrl);
      ctrl--;
      temp = list[ctrl];
      list[ctrl] = list[index];
      list[index] = temp;
    }
    return list;
  }


  selectedCard(activeCard: any) {
    this.currentTurns--;
    this.unflipAll = false;
    if (this.currentTurns == 1) {
      // Store first click info
      this.firstCardInfo = activeCard;
    }

    if (this.currentTurns == 0) {
      // Time to compare
      if (activeCard.card == this.firstCardInfo.card) {
        if (this.turn) {
          this.pts.ptsPlayer1++;
        } else {
          this.pts.ptsPlayer2++;
        }
        this.getWinner();
      } else {
        this.firstCardInfo.revealed = activeCard.revealed = false;
        // send cards to be unflipped
        this.unflipCards = [this.firstCardInfo, activeCard];
        // change player turn
        this.turn = !this.turn;
        this.resetTimer();

      }
      this.currentTurns = 2;
    }
  }

  getWinner() {
    if ((this.pts.ptsPlayer1 + this.pts.ptsPlayer2) == (this.howMany / 2)) {
      this.winner = true;
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
    this.allCards = this.shuffleCards(this.initArray);
    this.winner = false;
    this.pts.ptsPlayer1 = this.pts.ptsPlayer2 = 0;
    this.currentTurns = 2;
    this.unflipAll = true;
    this.unflipCards = []
    this.resetTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.turn =!this.turn;
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
