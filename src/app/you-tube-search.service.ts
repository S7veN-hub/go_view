import { Inject, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SearchResult } from './models/search-result.model';

export const YOUTUBE_API_KEY = 'AIzaSyByR9J73pTGy8uN8tMDXkOmAI26yerlvqI';
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable({
  providedIn: 'root'
})

export class YouTubeSearchService {
  httpResponse: any;
  results: SearchResult[];

  constructor(private httpClient: HttpClient, @Inject(YOUTUBE_API_KEY) private apiKey: string, @Inject(YOUTUBE_API_URL) private apiUrl: string) {
  }

  search(query: string): any {
    this.results = [];
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    const queryUrl = `${this.apiUrl}?${params}`;

    return this.httpClient.get(queryUrl).toPromise()
    .then(
      httpResponse => {
        this.httpResponse = httpResponse;
        this.httpResponse.items.map(item => {
          this.results.push(
            new SearchResult({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.high.url
            })
          );
        });
        return this.results;
      }
    );
  }
}
