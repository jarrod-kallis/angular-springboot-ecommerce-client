import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CartStatus } from '../../common/models/cartStatus.model';
import { CartService } from '../../common/services/cart.service';
import { CreditCardService } from '../../common/services/credit-card.service';
import { AddressComponent } from './address/address.component';
import { CountryService } from '../../common/services/country.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  form: FormGroup;
  cartStatus$: Observable<CartStatus>;
  creditCardMonths$: Observable<string[]>;
  creditCardYears$: Observable<number[]>;

  @ViewChild('billingAddress', { static: false }) billingAddressRef: AddressComponent;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private creditCardService: CreditCardService,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    this.cartStatus$ = this.cartService.cartStatus$;
    // The list of countries has to be the exact same array object in order to assign
    // the selected shipping address country to the billing address, and for it to be auto-selected by the dropdown
    this.countryService.getCountryList();

    // this.form = new FormGroup({
    //   customer: new FormGroup({
    //     firstName: new FormControl('', [Validators.required]),
    //     lastName: new FormControl('', [Validators.required]),
    //     emailAddress: new FormControl('', [Validators.email, Validators.required])
    //   })
    // });

    this.form = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        emailAddress: ['', [Validators.email, Validators.required]]
      }),
      shippingAddress: this.formBuilder.group({
        country: ['', [Validators.required]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: [''],
        zipCode: ['', [Validators.required]]
      }),
      billingAddress: this.formBuilder.group({
        country: ['', [Validators.required]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: [''],
        zipCode: ['', [Validators.required]]
      }),
      creditCard: this.formBuilder.group({
        type: ['', [Validators.required]],
        name: ['', [Validators.required]],
        number: ['', [Validators.required]],
        cvv: ['', [Validators.required]],
        month: ['', [Validators.required]],
        year: [new Date().getFullYear(), [Validators.required]]
      })
    });

    this.creditCardYears$ = this.creditCardService.getYears();
    this.cmbCreditCardYearChange();
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked === true) {
      // this.form.patchValue({
      //   billingAddress: {
      //     ...this.form.value.shippingAddress
      //   }
      // });

      this.billingAddressRef.update(this.form.value.shippingAddress.country);

      this.form.controls.billingAddress.setValue(this.form.controls.shippingAddress.value);
    } else {
      this.form.controls.billingAddress.reset();

      this.billingAddressRef.update(null);
    }
  }

  submit() {
    console.log(this.form.value.shippingAddress);
    console.log(this.form.value.billingAddress);
  }

  cmbCreditCardYearChange() {
    this.creditCardMonths$ = this.creditCardService.getMonths(Number(this.form.value.creditCard.year));

    this.creditCardMonths$
      .pipe(take(1))
      .subscribe(months => {
        // If we change to a year that no longer includes the month that was previously chosen then we clear the month
        // eg. Changing from future year to current year
        if (months.includes(this.form.value.creditCard.month) === false) {
          this.form.patchValue({
            creditCard: {
              month: ''
            }
          });
        }
      });
  }
}
