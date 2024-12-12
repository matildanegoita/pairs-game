import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImages(count: number): Observable<string[]> {
    const urls = Array.from({ length: count }, (_, i) =>
      `https://picsum.photos/200?random=${i}`
    );
    return new Observable((observer) => {
      observer.next(urls);
      observer.complete();
    });
  }
}
