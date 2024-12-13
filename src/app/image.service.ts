import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  private apiUrl = 'https://api.thecatapi.com/v1/images/search';
  private apiKey = 'live_CALt6YQhRndNANx7hfFcfUbvpzggHKWz7LPhHIyryyzTVZ5LwJQG96J1ridukfce';

  constructor() {}

  async getImages(count: number): Promise<string[]> {
    const response = await fetch(`${this.apiUrl}?limit=${count}&size=thumb`, {
      headers: {
        'x-api-key': this.apiKey,
      }
    });
    const data = await response.json();
    // Extrage URL-urile imaginilor
    return data.map((item: any) => item.url);
  }
}
