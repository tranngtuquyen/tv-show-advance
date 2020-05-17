import { Component, OnInit } from '@angular/core';
import {TvShowService} from '../tv-show.service';
import {IEpisode, ISeason, ITVShow} from '../itvshow';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {
  episode: IEpisode;

  constructor(
    private showService: TvShowService,
    private route: ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.getEpisode();
    this.route.params.subscribe(routeParams => {
      this.getEpisode();
    });
  }

  getEpisode() {
    const id = +this.route.snapshot.paramMap.get('id'); 
    this.showService.getEpisodeFromId(id).subscribe(data => this.episode = data);
  }

}
