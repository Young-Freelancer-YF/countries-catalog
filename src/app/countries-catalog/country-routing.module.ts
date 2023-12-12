import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CountriesListComponent } from './components/countries-list/countries-list.component';

const routes: Routes = [
  {
    path: 'country',
    component: CountriesListComponent,
  },
  { path: '', redirectTo: 'country', pathMatch: 'full' },
  { path: '**', redirectTo: 'country', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, HttpClientModule],
})
export class CountriesRoutingModule {}
