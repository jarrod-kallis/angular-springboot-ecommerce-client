import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../common/services/search.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl('')
    });

    this.searchService.searchKeyword
      .subscribe(keyword => this.form.patchValue({ keyword }));
  }

  submit() {
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
