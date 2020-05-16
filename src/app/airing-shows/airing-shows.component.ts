import {Component} from '@angular/core';
import {ITVShow, ISeason, IEpisode, IAiringShow} from '../itvshow';
import {TvShowService} from '../tv-show.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-airing-shows',
  templateUrl: './airing-shows.component.html',
  styleUrls: ['./airing-shows.component.css']
})
export class AiringShowsComponent {
  airingShows = [];
  displayedColumns: string[] = [
    'Network', '00:00', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00'
  ];

  constructor(private service: TvShowService) {}

  ngOnInit(): void {
    this.getAiringShows();
  }

  getAiringShows() {
    this.service.getAiringShows().subscribe(data => {
      this.airingShows = this.createSchedule(data.splice(0,12)); 
      console.log(this.airingShows)});
  }

  createSchedule(data: IAiringShow[]) {
    let finalSchedule = [];
    let schedule = [];
    let dictionary = {};
    for (var i = 0; i < data.length; i++) {
      let airingShow = data[i];
      let airtime = airingShow.airtime;
      let network = airingShow.network;
      let obj = {};
      let flag = false;
      

      for (var j = 0; j < this.displayedColumns.length; j++) {
        let prop = this.displayedColumns[j];
        if (prop == "Network") {
          if (dictionary.hasOwnProperty(network)) {
            obj = schedule[dictionary[network]];
            flag = true;
          } else {
            obj[prop] = airingShow.network;
            dictionary[network] = schedule.length;
          }
          
        } else {
          if (prop == airtime) {
            obj[prop] = airingShow.show.name;
          } else {
            if (!obj.hasOwnProperty(prop)) {
              obj[prop] = "";
            }
          }
        }
      }
      if (flag == false) {
        schedule.push(obj);
      }
    }
    return schedule;
  }
}