import { Component, Input, OnInit } from '@angular/core';
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

  cards: { image: string }[] = [];
  flippedCards: number[] = [];
  matchedCards: number[] = [];
  loading = false;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.startGame(this.level.pairs);
  }

  startGame(pairs: number): void {
    this.loading = true;
    this.imageService.getImages(pairs).subscribe((images) => {
      this.cards = [...images, ...images]
        .map((image) => ({ image }))
        .sort(() => Math.random() - 0.5);
      this.flippedCards = [];
      this.matchedCards = [];
      this.loading = false;
    });
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
        } else {
          setTimeout(() => {
            this.flippedCards = [];
          }, 1000);
        }
      }
    }
  }
}
