import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.css']
})
export class SeasonDetailComponent implements OnInit {
  @Input() episodeList;
  @Input() seasonId;
  constructor() { }

  ngOnInit(): void {
  }
}
