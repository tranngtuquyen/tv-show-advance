import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TvShowService} from '../tv-show.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  searchValue: string;

  constructor(
    private router: Router,
    private service: TvShowService
  ) { }

  ngOnInit(): void {
  }
  goToSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
    this.service.getSearchShows(value).subscribe();
  }
}
