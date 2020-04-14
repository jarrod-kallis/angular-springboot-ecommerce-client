import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchKeyword = new Subject<string>();
  private _searchKeyword$ = this.searchKeyword.asObservable();

  updateSearchKeyword(keyword: string) {
    this.searchKeyword.next(keyword);
  }

  public get searchKeyword$(): Observable<string> {
    return this._searchKeyword$;
  }
}
