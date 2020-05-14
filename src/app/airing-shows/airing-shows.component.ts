import { Component, OnInit } from '@angular/core';
import {ITVShow, ISeason, IEpisode} from '../itvshow';
import {TvShowService} from '../tv-show.service';

@Component({
  selector: 'app-airing-shows',
  templateUrl: './airing-shows.component.html',
  styleUrls: ['./airing-shows.component.css']
})
export class AiringShowsComponent implements OnInit {
  shows;

  constructor(private showService: TvShowService) {
    this.shows = [
      {
        name: "Julia Roberts",
        airtime: "09:00",
        runtime: 30,
        endtime: "09:30",
        network: "CBS"
      }, 
      {
        name: "Nana Roberts",
        airtime: "10:00",
        runtime: 60,
        endtime: "11:00",
        network: "CNBC"
      }
    ];
   }

  ngOnInit(): void {
    //this.getAiringShows();
  }
  getAiringShows() {
    this.showService.getAiringShows().subscribe(data => this.shows = data);
  }
}
