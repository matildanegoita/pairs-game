import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-card',
  standalone: true,
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
  imports: [NgIf]
})
export class GameCardComponent {
  @Input() card!: { id: number; url: string; revealed: boolean };
  @Output() cardFlipped = new EventEmitter<void>();

  flipCard() {
    this.cardFlipped.emit();
  }
}
