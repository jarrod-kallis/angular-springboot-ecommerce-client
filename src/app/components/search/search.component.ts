import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      keyword: new FormControl('')
    });
  }

  submit() {
    if (this.form.value.keyword) {
      // this.router.navigate(['search', this.form.value.keyword]);
      this.router.navigateByUrl(`search/${this.form.value.keyword}`);
    }
  }
}
