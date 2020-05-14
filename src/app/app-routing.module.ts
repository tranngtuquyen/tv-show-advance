import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { TvShowDetailComponent } from './tv-show-detail/tv-show-detail.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { AiringShowsComponent } from './airing-shows/airing-shows.component';


const routes: Routes = [
  {path: '', component: ShowListComponent},
  {path: 'show/:id', component: TvShowDetailComponent},
  {path: 'episode/:id', component: EpisodeDetailComponent},
  {path: 'airing', component: AiringShowsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
