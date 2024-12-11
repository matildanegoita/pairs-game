import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private images: string[] = [];

  fetchImages(count: number) {
    this.images = Array.from({ length: count }, () =>
      `https://picsum.photos/200/300?random=${Math.random() * 1000}`
    );
  }

  getImages() {
    return [...this.images]; // Returnăm o copie a imaginilor
  }
}
