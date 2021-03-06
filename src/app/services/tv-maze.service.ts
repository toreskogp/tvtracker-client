import { Injectable } from '@angular/core';
import {Http, URLSearchParams, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {Show} from '../interfaces';


@Injectable()
export class TvMazeService {
  _url: string = 'https://api.tvmaze.com'

  constructor(private _http: Http) { }

  search(query: string): Observable<Show[]> {
    const search: URLSearchParams = new URLSearchParams();
    search.set('q', query);

    return this._http.get(this._url + '/search/shows', {search})
      .map(res => {
        return res.json().map(res => {
          let show = res.show
          show.tvmazeId = show.id
          show.id = null
          return show
        })
      })
  }

  getEpisodes(showId: number) {
    let query = this._url + '/shows/' + showId + '/episodes'
    return this._http.get(query)
      .map(res => res.json())
  }
}
