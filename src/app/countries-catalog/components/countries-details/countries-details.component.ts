import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-countries-details',
  templateUrl: './countries-details.component.html',
  styleUrls: ['./countries-details.component.css'],
})
export class CountriesDetailsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  data: any;
  Object: any;
  loading: boolean = false;
  constructor(
    private countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public name: string,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDetailOfCountry();
  }

  getDetailOfCountry() {
    this.loading = true;
    const sub = this.countryService
      .searchNameOfCountry(this.name)
      .subscribe((res) => {
        if (res) {
          this.data = res[0];
          this.loading = false;
          this.cdr.detectChanges();
        }
      });

    this.unsubscribe.push(sub);
  }

  getNativeNames(nativeNameObj: any): any {
    if (nativeNameObj) {
      return Object.keys(nativeNameObj).map((key) => nativeNameObj[key]);
    } else {
      return [];
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
