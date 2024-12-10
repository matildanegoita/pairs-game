import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardData } from '../card.models';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent{
  @Input() cardData?: CardData;
  @Output() cardClicked=new EventEmitter<CardData>();

  private path: string= 'assets/';
  constructor(){}
  createImagePath(): string {
    if (!this.cardData) {
      return ''; // Returnăm un string gol dacă nu există `cardData`
    }
    return `${this.path}${this.cardData.imageId}.png`;
  }

  onCardClick(): void {
    if (this.cardData) {
      this.cardClicked.emit(this.cardData); // Emit card-ul asociat
    }
  }
}
