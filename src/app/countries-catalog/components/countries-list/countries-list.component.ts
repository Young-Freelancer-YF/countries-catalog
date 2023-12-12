import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css'],
})
export class CountriesListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private unsubscribe: Subscription[] = [];
  contriesList: any;
  resultsLength = 0;
  displayedColumns: string[] = [
    'no',
    'flags',
    'name',
    'cca2',
    'cca3',
    'nativeName',
    'idd',
    'altSpellings',
  ];
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  dataSource: any;

  constructor(
    private countryService: CountryService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    const sub = this.countryService.getCountries({}).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.slice(25));
    });

    this.unsubscribe.push(sub);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
