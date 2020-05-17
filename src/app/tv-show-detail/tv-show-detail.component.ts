import { Component, OnInit } from '@angular/core';
import {ITVShow, IEpisode, ISeason} from '../itvshow';
import {TvShowService} from '../tv-show.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.css']
})
export class TvShowDetailComponent implements OnInit {
  show: ITVShow;
  episodesList: IEpisode[] = [];
  selectedSeason: number;

  constructor(
    private showService: TvShowService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getShowDetail();
  }

  getShowDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.showService.getShowFromId(id).subscribe(data => this.show = data);
  }

  getEpisodeList(seasonId: number) {
    this.showService.getEpisodeListFromSeasonId(seasonId).subscribe(data => {
      this.episodesList = [];
      if (data[0].episode == null) {
      data.shift();
      }
      this.episodesList = data;
      console.log(this.episodesList);
    }
  )}
}
