import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  private apiUrl = 'https://api.thecatapi.com/v1/images/search';
  private apiKey = 'live_CALt6YQhRndNANx7hfFcfUbvpzggHKWz7LPhHIyryyzTVZ5LwJQG96J1ridukfce';

  constructor(private http: HttpClient) {}

  getImages(count: number): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}?limit=${count}&size=thumb`, {
      headers: {
        'x-api-key': this.apiKey,
      }
    }).pipe(
      // Extrage URL-urile imaginilor
      map((response) => response.map((item) => item.url))
    );
  }
}
