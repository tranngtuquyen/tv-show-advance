import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { TvShowDetailComponent } from './tv-show-detail/tv-show-detail.component';


const routes: Routes = [
  {path: '', component: ShowListComponent},
  {path: 'show/:id', component: TvShowDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
