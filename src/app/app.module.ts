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
import { AiringShowsComponent } from './airing-shows/airing-shows.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    AppComponent,
    TvShowDetailComponent,
    SeasonDetailComponent,
    NavigationBarComponent,
    ShowListComponent,
    EpisodeDetailComponent,
    AiringShowsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [TvShowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
