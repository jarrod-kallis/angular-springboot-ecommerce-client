import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Country } from '../models/country.model';
import { environment } from '../../../environments/environment';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private COUNTRY_URL = `${environment.baseUrl}/country`;

  private countries$: Observable<Country[]>;

  constructor(private http: HttpClient) { }

  getCountryList(): Observable<Country[]> {
    this.countries$ = this.http.get<GetCountries>(this.COUNTRY_URL)
      .pipe(
        map((value: GetCountries) => {
          return value._embedded.country;
        }),
        shareReplay()
        // tap(value => console.log(value))
      );

    return this.countries$;
  }

  getCountry(countryCode: string): Observable<Country> {
    return this.countries$
      .pipe(
        map(countries => countries.filter(country => country.code === countryCode)[0])
      );
  }
}


interface GetCountries {
  _embedded: {
    country: Country[]
  };
  page: Page;
}
