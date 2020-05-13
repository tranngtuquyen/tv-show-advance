import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TvShowDetailComponent } from './tv-show-detail/tv-show-detail.component';
import { SeasonDetailComponent } from './season-detail/season-detail.component';
import {TvShowService} from './tv-show.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ShowListComponent } from './show-list/show-list.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TvShowDetailComponent,
    SeasonDetailComponent,
    NavigationBarComponent,
    ShowListComponent,
    EpisodeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TvShowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
