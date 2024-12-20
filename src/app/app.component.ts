import { Component } from '@angular/core';
import { GameComponent } from './game/game.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, GameComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  levels = [
    { name: 'Easy', pairs: 3 },
    { name: 'Medium', pairs: 6 },
    { name: 'Hard', pairs: 9 },
  ];
  selectedLevel: { name: string; pairs: number } | null = null;

  selectLevel(level: { name: string; pairs: number }): void {
    this.selectedLevel = null; // Resetează nivelul selectat anterior
    setTimeout(() => {
      this.selectedLevel = level; // Setează noul nivel
    });
  }  
  restart(): void {
    const easyLevel = this.levels.find((level) => level.name === 'Easy');
    if (easyLevel) {
      this.selectedLevel = null; // Resetează nivelul selectat anterior
      setTimeout(() => {
        this.selectedLevel = easyLevel; // Setează nivelul "Easy"
      });
    }
  }
  
}
