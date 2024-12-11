import { Component } from '@angular/core';
import { ImageService } from './image.service';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [GameComponent],
})
export class AppComponent {
  level = 1;
  images: string[] = []; // Imagini pentru nivelul curent

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.loadLevel();
  }

  loadLevel() {
    console.log(`Începem nivelul ${this.level}. Generăm imagini...`);
    const cardCount = this.level * 4; // 4 imagini pereche per nivel
    console.log('Număr de carduri:', cardCount);

    this.imageService.fetchImages(cardCount / 2); // Jumătate perechi
    this.images = this.imageService.getImages(); // Obținem imaginile generate
    console.log('Imagini generate pentru nivel:', this.images);
  }

  onLevelComplete() {
    console.log(`Nivel complet! Trecem la nivelul următor: ${this.level + 1}`);
    this.level++;
    this.loadLevel();
  }
}
