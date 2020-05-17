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
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { MainViewComponent } from './main-view/main-view.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { TruncateTextPipe } from './truncate-text.pipe';



@NgModule({
  declarations: [
    AppComponent,
    TvShowDetailComponent,
    SeasonDetailComponent,
    NavigationBarComponent,
    ShowListComponent,
    EpisodeDetailComponent,
    AiringShowsComponent,
    SearchComponent,
    MainViewComponent,
    TruncateTextPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [TvShowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
