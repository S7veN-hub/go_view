import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../models/search-result.model';

@Component({
  selector: 'app-you-tube-search',
  templateUrl: './you-tube-search.component.html',
  styleUrls: ['./you-tube-search.component.css']
})
export class YouTubeSearchComponent implements OnInit {
  results: SearchResult[];
  loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  updateResults(results: SearchResult[]) {
    this.results = results;
  }

}
