import { Component, OnInit, Input } from '@angular/core';
import {IEpisode, ISeason, ITVShow} from '../itvshow';
import {TvShowService} from '../tv-show.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  @Input() showList: ITVShow[];
  
  constructor(private showService: TvShowService) { }

  ngOnInit(): void {
  }

  checkFavorited(show: ITVShow) {
    let myList = this.showService.getFavoriteList();
    let index = myList.findIndex(item => item.id === show.id);
    if (index === -1) {
      this.showService.addToFavoriteList(show.id);
      this.showService.addToFavoriteTags(show.id);
    } else {
      this.showService.removeFromFavoriteList(show.id);
      this.showService.removeFromFavoriteTags(show.id);
    }
  }

  isLiked(showId) {
    let favoriteTags = this.showService.getFavoriteTags();
    return {
      'favorite-icon-inner': favoriteTags.indexOf(showId) === -1 ? true: false,
      'favorite-icon-liked': favoriteTags.indexOf(showId) === -1 ? false: true
    }
  }
}
