import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { Country } from '../../../common/models/country.model';
import { CountryService } from '../../../common/services/country.service';
import { StateService } from '../../../common/services/state.service';
import { State } from '../../../common/models/state.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() formGroupName: string;
  @Input() title: string;

  countries$: Observable<Country[]>;
  states$: Observable<State[]>;
  selectedCountry$: Observable<Country>;

  // Update billing address to the same as shipping address
  @Input() update = (country: Country) => {
    this.updateCountry(country);
  }

  constructor(
    private countryService: CountryService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.countries$ = this.countryService.countries$;
  }

  updateCountry(country: Country) {
    this.selectedCountry$ = this.countryService.getCountry(country.code);

    this.states$ = this.stateService.getStateListForCountry(country.code);
  }

  cmbCountryChange() {
    this.updateCountry(this.formGroup.get(this.formGroupName).value.country);
    this.states$
      .pipe(take(1))
      .subscribe(states => {
        // Automatically select the first state in the list
        this.formGroup.get(this.formGroupName).get('state').setValue(states[0].id);
      });
  }
}
