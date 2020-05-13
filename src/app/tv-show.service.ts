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
    seasons: ISeasonData[]
  }
}

interface ISeasonData {
  id: number;
  number: number;
}

interface IEpisodeData {
  id: number;
  name: string;
  number: number | null;
  image: {
    medium: string
  };
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  constructor(private http: HttpClient) { }

  getShowFromId(showId: number) {
    const url = `https://api.tvmaze.com/shows/${showId}?embed=seasons`;
    return this.http.get<ITvShowData>(url).pipe(map(data => this.transformToIShow(data)));
  }

  getSeasonsFromShowId(showId: number) {
    const url = `http://api.tvmaze.com/shows/${showId}/seasons`;
    return this.http.get<ISeasonData[]>(url).pipe(map(data => this.transformToISeason(data)));
  }

  getEpisodeListFromSeasonId(seasonId: number) {
    const url = `http://api.tvmaze.com/seasons/${seasonId}/episodes`;
    return this.http.get<IEpisodeData[]>(url).pipe(map(data => this.transformToIEpisode(data)));
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
      seasons: data._embedded ? this.transformToISeason(data._embedded.seasons) : []
    };
  }

  transformToISeason(data: ISeasonData[]): ISeason[]{
    return data.map(d => ({
      id: d.id,
      name: `Season ${d.number}`
    }));
  }

  transformToIEpisode(data: IEpisodeData[]): IEpisode[] {
    return data.map(d => ({
      id: d.id,
      name: d.name,
      episode: d.number? d.number : null,
      image: d.image? d.image.medium: '',
      description: d.summary
    }));
  }

  getAllShows() {
    const url = `http://api.tvmaze.com/shows`;
    return this.http.get<ITvShowData[]>(url).pipe(map(data => data.map(d => this.transformToIShow(d))));
  }
}
