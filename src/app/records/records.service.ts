import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor(private http: HttpClient) { }

  getRecords(): Observable<any[]> {
    const url = 'http://wd.etsisi.upm.es:10000/records';
    return this.http.get<any[]>(url);
  }
}
