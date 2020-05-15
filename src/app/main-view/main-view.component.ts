import { Component, OnInit } from '@angular/core';
import {ITVShow} from '../itvshow';
import {TvShowService} from '../tv-show.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  showList: ITVShow[] = [];

  constructor(private showService: TvShowService) { }

  ngOnInit(): void {
    this.getAllShows();
  }

  getAllShows() {
    this.showService.getAllShows().subscribe(data => this.showList = data)
  }

}
