import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Page } from '../models/page.model';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private STATE_URL = `${environment.baseUrl}/state`;

  constructor(private http: HttpClient) { }

  getStateListForCountry(countryCode: string): Observable<State[]> {
    return this.http.get<GetStates>(`${this.STATE_URL}/search/findByCountryCode?code=${countryCode}`)
      .pipe(
        map((value: GetStates) => {
          return value._embedded.state.map(state => new State(state.id, state.name));
        })
        // tap(value => console.log(value))
      );
  }
}


interface GetStates {
  _embedded: {
    state: State[]
  };
  page: Page;
}
