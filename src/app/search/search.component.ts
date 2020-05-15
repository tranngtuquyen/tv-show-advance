import { Component, OnInit } from '@angular/core';
import { ITVShow } from '../itvshow';
import { ActivatedRoute } from '@angular/router';
import { TvShowService } from '../tv-show.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchShows: ITVShow[];

  constructor(
    private route: ActivatedRoute,
    private service: TvShowService
  ) { }

  ngOnInit(): void {
    console.log("get initiated");
    this.getSearchShows();
  }

  getSearchShows() {
    this.service.searchResult$.subscribe(data => this.searchShows = data);
    const term = this.route.snapshot.paramMap.get('term');
    this.service.getSearchShows(term).subscribe();
  }
}
