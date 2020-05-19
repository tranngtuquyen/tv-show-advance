import { Injectable } from '@angular/core';
import {IEpisode, ITVShow, ISeason, IAiringShow} from './itvshow';
import { HttpClient } from '@angular/common/http';

import {map, tap} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

interface ITvShowData {
  id: number;
  name: string;
  language: string;
  genres: string[];
  rating: {average: number};
  image: {
    medium: string,
    original: string
  };
  summary: string;
  _embedded: {
    seasons: Array<{id: number}>,
    cast: Array<{person: {name: string}}>
  };
  network: { name: string};
}

interface IEpisodeData {
  id: number;
  name: string;
  number: number | null;
  image: {
    medium: string,
    original: string
  };
  summary: string;
  season: number,
  _embedded: {
    show: {
      id: number
    }
  }
}

interface IAiringShowData {
  season: number;
  number: number;
  airtime: string;
  runtime: number;
  show: ITvShowData;
}

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  searchResult: Subject<ITVShow[]> = new Subject<ITVShow[]>();
  searchResult$ = this.searchResult.asObservable();
  private myFavorite: ITVShow[] = [];
  private favoriteTags: number[] = [];

  constructor(private http: HttpClient) { }

  getFavoriteList() {
    return this.myFavorite;
  }

  addToFavoriteList(showId: number) {
    this.getShowFromId(showId).subscribe(data => this.myFavorite.push(data));
  }

  removeFromFavoriteList(showId: number) {
    this.getShowFromId(showId).subscribe(data => {
      let index = this.myFavorite.findIndex(d => d.id === showId);
      if ( index !== -1) {
        this.myFavorite.splice(index,1);
      }
      console.log(this.myFavorite);
    });
  }

  getFavoriteTags() {
    return this.favoriteTags;
  }

  addToFavoriteTags(showId: number) {
    this.favoriteTags.push(showId);
  }

  removeFromFavoriteTags(showId: number) {
    let index = this.favoriteTags.findIndex(i => i == showId);
    this.favoriteTags.splice(index, 1);
  }

  getShowFromId(showId: number) {
    const url = `http://api.tvmaze.com/shows/${showId}?embed[]=seasons&embed[]=cast`;
    return this.http.get<ITvShowData>(url).pipe(map(data => this.transformToIShow(data)));
  }

  getSeasonsFromShowId(showId: number) {
    const url = `http://api.tvmaze.com/shows/${showId}/seasons`;
    return this.http.get<Array<{id: number}>>(url).pipe(map(data => this.transformToSeason(data)));
  }

  getEpisodeListFromSeasonId(seasonId: number) {
    const url = `http://api.tvmaze.com/seasons/${seasonId}/episodes`;
    return this.http.get<IEpisodeData[]>(url).pipe(map(data => this.transformToIEpisodeList(data)));
  }

  getEpisodeFromId(episodeId: number, seasonId: number) {
    const fullUrl = `http://api.tvmaze.com/seasons/${seasonId}/episodes`;
    return this.http.get<IEpisodeData[]>(fullUrl).pipe(map(data => this.transformToIEpisodeList(data)
    .filter(d => d.id == episodeId)));
  }

  transformToIShow(data: ITvShowData): ITVShow {
    return {
      id: data.id,
      name: data.name,
      description: data.summary,
      image: data.image? data.image.medium : "",
      rating: data.rating? data.rating.average: null,
      language: data.language,
      genres: data.genres,
      seasons: data._embedded ? this.transformToSeason(data._embedded.seasons) : [],
      cast: data._embedded ? this.transformToCast(data._embedded.cast): [],
      network: data.network? data.network.name : ''
    };
  }

  transformToSeason(data: Array<{id: number}>): number[]{
    return data.map(d => d.id);
  }
  
  transformToCast(data: Array<{person: {name: string}}>): string[] {
    return data.map(d => d.person.name);
  }

  transformToIEpisodeList(data: IEpisodeData[]): IEpisode[] {
    return data.map((d,i, arr) => {
      var episode = this.transformToIEpisode(d);
      episode.image = d.image? d.image.medium: '';
      episode.preEpisode = this.getPreEpisodeFromSeasonIndex(arr, i);
      episode.nextEpisode = this.getNextEpisodeFromSeasonIndex(arr, i);
      return episode;
    });
  }

  getPreEpisodeFromSeasonIndex(data: IEpisodeData[], index: number) {
    let preEpisode = index > 0 ? data[index - 1]: null;
    return preEpisode ? preEpisode.id : null;
  }

  getNextEpisodeFromSeasonIndex(data: IEpisodeData[], index: number) {
    let nextEpisode = index < data.length - 1 ? data[index + 1]: null;
    return nextEpisode ? nextEpisode.id : null;
  }

  transformToIEpisode(d: IEpisodeData): IEpisode {
    return ({id: d.id,
      name: d.name,
      episode: d.number? d.number : null,
      season: d.season,
      image: d.image? d.image.original: '',
      description: d.summary,
      preEpisode: null,
      nextEpisode: null
    });
  }

  getAllShows() {
    const url = `http://api.tvmaze.com/shows`;
    return this.http.get<ITvShowData[]>(url).pipe(map(data => data.map(d => this.transformToIShow(d))));
  }

  getAiringShows() {
    const date = new Date();
    let year = date.getFullYear();
    let monthNumber = date.getMonth() + 1;
    let month = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
    let dayNumber = date.getDate();
    let day = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
    let dateAsString = `${year}-${month}-${day}`;
    
    const url = `http://api.tvmaze.com/schedule?country=US&date=${dateAsString}`;
    return this.http.get<IAiringShowData[]>(url).pipe(map(data => data.map(d => this.transformToIAiringShow(d))))
  }

  transformToIAiringShow(data: IAiringShowData) : IAiringShow {
    return ({
      season: data.season,
      epsiode: data.number,
      airtime: data.airtime,
      runtime: data.runtime,
      show: this.transformToIShow(data.show),
      network: data.show.network? data.show.network.name: ""
    });
  }

  getSearchShows(term: string) {
    const url = `http://api.tvmaze.com/search/shows?q=${term}`;
    return this.http.get<Array<{show: ITvShowData}>>(url).pipe(map(data => data.map(d => this.transformToIShow(d.show))),
    tap(x => this.searchResult.next(x)));
  }

}
