import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { Country } from '../../../common/models/country.model';
import { CountryService } from '../../../common/services/country.service';
import { StateService } from '../../../common/services/state.service';
import { State } from '../../../common/models/state.model';

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

  @Input() update = (countryCode: string) => {
    this.updateCountry(countryCode);
  }

  constructor(
    private countryService: CountryService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.countries$ = this.countryService.getCountryList();
  }

  updateCountry(countryCode: string) {
    this.selectedCountry$ = this.countryService.getCountry(countryCode);

    this.states$ = this.stateService.getStateListForCountry(countryCode);
    this.formGroup.get(this.formGroupName).get('state').setValue('');
  }

  cmbCountryChange() {
    this.updateCountry(this.formGroup.get(this.formGroupName).value.country);
  }
}
