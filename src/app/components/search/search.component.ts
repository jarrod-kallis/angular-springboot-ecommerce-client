import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map, distinctUntilChanged, startWith, debounce, switchMap, tap } from 'rxjs/operators';

import { SearchService } from '../../common/services/search.service';
import { fromEvent, timer } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl('')
    });

    // Insert the search keyword when emitted by the service
    this.searchService.searchKeyword$
      .subscribe(keyword => this.form.patchValue({ keyword }));

    // Search automatically as the user types
    fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        startWith(''),
        distinctUntilChanged(),
        debounce(value => value === '' ? timer(0) : timer(500)),
        tap(() => this.navigate())
      )
      .subscribe();
  }

  submit() {
    this.navigate();
  }

  navigate() {
    // this.router.navigateByUrl(`search/${this.form.value.keyword}`);

    this.route.queryParams
      .pipe(
        take(1)
      )
      .subscribe((queryParams) => {
        this.router.navigate(['search', this.form.value.keyword], { queryParams: { ...queryParams, page: 1 } });
      });
  }
}
