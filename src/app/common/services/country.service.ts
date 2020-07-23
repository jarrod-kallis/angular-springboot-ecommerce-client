import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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

  private countriesSubject = new BehaviorSubject<Country[]>([]);
  private _countries$: Observable<Country[]> = this.countriesSubject.asObservable();

  constructor(private http: HttpClient) { }

  public get countries$(): Observable<Country[]> {
    return this._countries$;
  }

  getCountryList() {
    this.http.get<GetCountries>(this.COUNTRY_URL)
      .pipe(
        map((value: GetCountries) => {
          return value._embedded.country
            .map(country => new Country(country.id, country.code, country.name, country.stateDescription, country.zipCodeDescription));
        }),
        shareReplay()
        // tap(value => console.log(value))
      )
      .subscribe(countries => this.countriesSubject.next(countries));
  }

  getCountry(countryCode: string): Observable<Country> {
    return this._countries$
      .pipe(
        map(countries => countries.find(country => country.code === countryCode))
      );
  }
}


interface GetCountries {
  _embedded: {
    country: Country[]
  };
  page: Page;
}
