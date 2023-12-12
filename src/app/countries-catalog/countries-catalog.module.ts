import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountriesDetailsComponent } from './components/countries-details/countries-details.component';
import { CountriesRoutingModule } from './country-routing.module';
import { MatTableModule } from '@angular/material/table';
import { CountryService } from './services/country.service';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [CountriesListComponent, CountriesDetailsComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [CountryService],
})
export class CountriesCatalogModule {}
