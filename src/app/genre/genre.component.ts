import { Component, OnInit } from '@angular/core';
import {ITVShow} from '../itvshow';
import {TvShowService} from '../tv-show.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  selectedShows: ITVShow[] = [];

  constructor(
    private showService: TvShowService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getShowInGenre();
    this.route.params.subscribe(routeParams => {
      this.getShowInGenre();
    });
  }

  getShowInGenre() {
    let genre = this.route.snapshot.paramMap.get('genre');
    let newGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
    this.showService.getAllShows().subscribe(data => {
      this.selectedShows = data.filter(show => show.genres.indexOf(newGenre) !== -1);
    });
  }

}
