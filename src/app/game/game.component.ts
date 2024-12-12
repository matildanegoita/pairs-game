import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GameCardComponent } from '../game-card/game-card.component';
import { ImageService } from '../image.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgIf, GameCardComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Input() level!: { name: string; pairs: number };
  @Output() restart = new EventEmitter<void>();

  cards: { image: string }[] = [];
  flippedCards: number[] = [];
  matchedCards: number[] = [];
  score: number = 0;
  timeLeft: number = 0;
  timerInterval: any ;
  loading = false;
  gameOver: boolean = false;
  gameOverMessage: string = '';
  totalTime: number = 0;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.startGame(this.level.pairs);
  }

  startGame(pairs: number): void {
    this.loading = true;
    this.score = 0;
  
    // Setează timpul total și timpul rămas în funcție de nivelul selectat
    this.totalTime = this.level.name === 'Easy' ? 30 : this.level.name === 'Medium' ? 60 : 90;
    this.timeLeft = this.totalTime;
  
    // Pornește cronometrul
    this.startTimer();
  
    // Obține imaginile folosind serviciul și inițializează cărțile
    this.imageService.getImages(pairs).subscribe((images) => {
      this.cards = [...images, ...images]
        .map((image) => ({ image }))
        .sort(() => Math.random() - 0.5);
      this.flippedCards = [];
      this.matchedCards = [];
      this.loading = false;
    });
  }
  
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval);
        this.endGame(false);
      }
    }, 1000);
  }

  flipCard(index: number): void {
    if (
      this.flippedCards.length < 2 &&
      !this.flippedCards.includes(index) &&
      !this.matchedCards.includes(index)
    ) {
      this.flippedCards.push(index);
  
      if (this.flippedCards.length === 2) {
        const [firstIndex, secondIndex] = this.flippedCards;
  
        if (this.cards[firstIndex].image === this.cards[secondIndex].image) {
          this.matchedCards.push(firstIndex, secondIndex);
          this.flippedCards = [];
          this.score += 10;
  
          // Verificăm dacă jocul s-a terminat
          if (this.matchedCards.length === this.cards.length) {
            this.endGame(true);
          }
        } else {
          setTimeout(() => {
            this.flippedCards = [];
          }, 1000);
        }
      }
    }
  }
  
    endGame(won: boolean): void {
      clearInterval(this.timerInterval);

  this.gameOver = true;
  this.gameOverMessage = won
    ? `Congratulations! Your score is ${this.score}. Time left: ${this.timeLeft} seconds.`
    : `Time is up! Better luck next time.`;

  // Resetare automată după câteva secunde (opțional)
  setTimeout(() => this.restart.emit(), 5000);
}
}
