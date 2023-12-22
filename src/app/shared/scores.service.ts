import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../models/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor(private http: HttpClient) { }

  //getting the top records
  getRecords(): Observable<any[]> {
    const url = config.base_url +'/records';
    return this.http.get<any[]>(url);
  }

  //getting the top records of the user 
  getUserRecords(username: string): Observable<any[]> {
    const url = `${config.base_url}/records/${username}`;
    // Retrieve the token from storage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.get<any[]>(url, { headers });
  }

  //saving a score 
  saveUserScore(score: number, ufos: number, time: number){
    const url = `${config.base_url}/records/`;
    const scoreData = { punctuation: score, ufos, disposedTime: time };

    // Retrieve the token from storage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }
    // Create headers with Authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post(url, scoreData, { headers });
  }
}
