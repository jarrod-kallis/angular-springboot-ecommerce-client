import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchKeyword = new Subject<string>();

  updateSearchKeyword(keyword: string) {
    this.searchKeyword.next(keyword);
  }
}
