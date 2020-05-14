import { Injectable } from '@angular/core';
import {IEpisode, ITVShow, ISeason} from './itvshow';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';

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
  }
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
  season: number
}

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  constructor(private http: HttpClient) { }

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

  getEpisodeFromId(episodeId: number) {
    const url = `http://api.tvmaze.com/episodes/${episodeId}`;
    return this.http.get<IEpisodeData>(url).pipe(map(data => this.transformToIEpisode(data)));
  }

  transformToIShow(data: ITvShowData): ITVShow {
    return {
      id: data.id,
      name: data.name,
      description: data.summary,
      image: data.image? data.image.medium : "",
      rating: data.rating.average,
      language: data.language,
      genres: data.genres,
      seasons: data._embedded ? this.transformToSeason(data._embedded.seasons) : [],
      cast: data._embedded ? this.transformToCast(data._embedded.cast): []
    };
  }

  transformToSeason(data: Array<{id: number}>): number[]{
    return data.map(d => d.id);
  }
  
  transformToCast(data: Array<{person: {name: string}}>): string[] {
    return data.map(d => d.person.name);
  }

  transformToIEpisodeList(data: IEpisodeData[]): IEpisode[] {
    return data.map(d => {
      var episode = this.transformToIEpisode(d);
      episode.image = d.image? d.image.medium: '';
      return episode;
    });
  }

  transformToIEpisode(d: IEpisodeData): IEpisode {
    return ({id: d.id,
      name: d.name,
      episode: d.number? d.number : null,
      season: d.season,
      image: d.image? d.image.original: '',
      description: d.summary}
    );
  }

  getAllShows() {
    const url = `http://api.tvmaze.com/shows`;
    return this.http.get<ITvShowData[]>(url).pipe(map(data => data.map(d => this.transformToIShow(d))));
  }

  getAiringShows() {
    const date = new Date("2015-05-05");
    let year = date.getFullYear();
    let monthNumber = date.getMonth() + 1;
    let month = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
    let dayNumber = date.getDate();
    let day = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
    let dateAsString = `${year}-${month}-${day}`;
    
    const url = `http://api.tvmaze.com/schedule?country=US&date=${dateAsString}`;
    return this.http.get<ITvShowData[]>(url).pipe(map(data => data.map(d => this.transformToIShow(d))));
  }

}
