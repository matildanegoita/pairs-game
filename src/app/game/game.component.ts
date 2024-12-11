import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [NgFor, NgIf],
})
export class GameComponent implements OnInit, OnChanges {
  @Input() images: string[] = []; // Imagini primite de la componenta părinte
  @Output() levelComplete = new EventEmitter<void>(); // Semnalizare finalizare nivel

  shuffledCards: { id: number; url: string; revealed: boolean }[] = [];
  firstCard: any = null; // Primul card selectat
  pairsFound = 0;

  ngOnInit() {
    this.generateCards(this.images);
  }

  ngOnChanges() {
    this.generateCards(this.images);
  }

  generateCards(images: string[]) {
    const cards = images.flatMap((url, id) => [
      { id: id * 2, url, revealed: false },
      { id: id * 2 + 1, url, revealed: false },
    ]);
    this.shuffledCards = this.shuffle(cards);
    console.log('Carduri generate:', this.shuffledCards);
    this.pairsFound = 0; // Resetăm perechile găsite.
  }

  shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  onCardFlipped(card: any) {
    if (!card || card.revealed || (this.firstCard && this.firstCard === card)) {
      return; // Ignorăm cardurile deja dezvăluite sau clickurile repetate
    }

    card.revealed = true; // Arată cardul

    if (!this.firstCard) {
      this.firstCard = card; // Salvează primul card selectat
    } else {
      // Comparăm dacă cele două carduri selectate sunt o pereche
      if (this.firstCard.url === card.url) {
        this.pairsFound++; // Creștem numărul de perechi găsite
        console.log(
          `Pereche găsită! Perechi găsite până acum: ${this.pairsFound}`
        );
        this.firstCard = null; // Resetăm primul card

        if (this.pairsFound === this.shuffledCards.length / 2) {
          console.log('Toate perechile găsite! Trecem la nivelul următor.');
          setTimeout(() => this.levelComplete.emit(), 500); // Semnalizează completarea nivelului
        }
      } else {
        // Dacă cardurile nu sunt o pereche, le întoarcem pe dos după o întârziere
        setTimeout(() => {
          if (this.firstCard) {
            this.firstCard.revealed = false;
          }
          card.revealed = false;
          this.firstCard = null;
        }, 1000);
      }
    }
  }
}
