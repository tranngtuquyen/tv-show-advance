import { Component, OnInit } from '@angular/core';
import { ITVShow } from '../itvshow';
import { TvShowService } from '../tv-show.service';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent implements OnInit {
  favoriteList: ITVShow[];
  constructor(private showService: TvShowService) { }

  ngOnInit(): void {
    this.getFavoriteList();
  }

  getFavoriteList() {
    this.favoriteList = this.showService.getFavoriteList();
  }

}
