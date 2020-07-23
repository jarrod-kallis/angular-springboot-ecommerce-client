import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  constructor() { }

  getMonths(selectedYear: number): Observable<string[]> {
    const currentYear = new Date().getFullYear();

    if (selectedYear === currentYear) {
      const currentDate = moment();
      // Return December of current year
      const yearEndDate = moment([currentYear, 11]); // Month is 0 based

      const months: string[] = [];
      // Move from current month until December
      while (yearEndDate.diff(currentDate, 'months') >= 0) {
        months.push(currentDate.format('MMMM'));
        currentDate.add(1, 'month');
      }
      return of(months);
    } else {
      return of(moment.months());
    }
  }

  getYears(): Observable<number[]> {
    const result: number[] = [];

    const currentYear = new Date().getFullYear();

    let year: number = currentYear;
    while (year <= currentYear + 10) {
      result.push(year);
      year++;
    }

    return of(result);
  }
}
