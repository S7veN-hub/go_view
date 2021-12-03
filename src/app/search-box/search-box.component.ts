import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, map, debounceTime, tap } from 'rxjs/operators';
import { YouTubeSearchService } from '../you-tube-search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('searchField') input: ElementRef;

  constructor(private youtube: YouTubeSearchService) {
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let inputElement = this.input.nativeElement;
    let obs = fromEvent(inputElement, 'keyup');
    obs.pipe(
      map((e: any) => e.target.value),
      filter((text: string) => text.length > 1),
      debounceTime(500),
      tap(() => this.loading.emit(true)),
      map((query: string) => this.youtube.search(query)),
    ).subscribe(
      results => {
        this.loading.emit(false);
        this.results.emit(results);
      },
      err => {
        console.log(err);
        this.loading.emit(false);
      },
      () => {
        this.loading.emit(false);
      }
    );
  }

}
