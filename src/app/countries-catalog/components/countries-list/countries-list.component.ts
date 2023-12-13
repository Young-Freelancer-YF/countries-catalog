import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CountriesDetailsComponent } from '../countries-details/countries-details.component';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  pageSize = 25;
  currentPage = 1;
  allCountries: any[] = [];
  displayedCountries: any[] = [];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(
    private countryService: CountryService,
    private _liveAnnouncer: LiveAnnouncer,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  openDialog(countryName: any): void {
    const dialogRef = this.dialog.open(CountriesDetailsComponent, {
      data: countryName,
      height: 'auto',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  getNativeNames(nativeNameObj: any): any {
    if (nativeNameObj) {
      return Object.keys(nativeNameObj).map((key) => nativeNameObj[key]);
    } else {
      return [];
    }
  }

  getCountries() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    const sub = this.countryService.getCountries({}).subscribe((res) => {
      if (res.length > 0) {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      }
    });

    this.unsubscribe.push(sub);
  }

  onSortChange(event: Sort) {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'name':
          return item?.name?.official?.toLowerCase() || '';
        default:
          return item[property];
      }
    };
    this.announceSortChange(event);
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) {
      try {
        const sub = this.countryService
          .searchNameOfCountry(filterValue.trim().toLowerCase())
          .subscribe(
            (res) => {
              this.dataSource = new MatTableDataSource<any>(res);
              this.dataSource.sort = this.sort;
              this.dataSource.sortingDataAccessor =
                this.dataSource.sortingDataAccessor;
              this.cdr.detectChanges();
            },
            (error) => {}
          );
        this.unsubscribe.push(sub);
      } catch (e) {}
    } else {
      this.getCountries();
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
