import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountriesDetailsComponent } from './components/countries-details/countries-details.component';
import { CountriesRoutingModule } from './country-routing.module';
import { MatTableModule } from '@angular/material/table';
import { CountryService } from './services/country.service';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CountriesListComponent, CountriesDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CountriesRoutingModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  providers: [CountryService],
})
export class CountriesCatalogModule {}
