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
}
