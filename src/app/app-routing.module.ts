import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { TvShowDetailComponent } from './tv-show-detail/tv-show-detail.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { AiringShowsComponent } from './airing-shows/airing-shows.component';
import { SearchComponent } from './search/search.component';
import { MainViewComponent } from './main-view/main-view.component';
import { GenreComponent } from './genre/genre.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';


const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: 'show/:id', component: TvShowDetailComponent},
  {path: 'season/:seasonId/episode/:episodeId', component: EpisodeDetailComponent},
  {path: 'airing', component: AiringShowsComponent},
  {path: 'search/:term', component: SearchComponent },
  {path: 'shows/:genre', component: GenreComponent},
  {path: 'favorite-list', component: MyFavoriteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
