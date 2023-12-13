import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getCountries(param: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, { params: param });
  }

  searchNameOfCountry(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/name/${name}`);
  }
}
