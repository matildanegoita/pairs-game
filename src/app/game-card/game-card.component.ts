import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-card',
  standalone: true,
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  @Input() image!: string;
  @Input() flipped = false;
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}