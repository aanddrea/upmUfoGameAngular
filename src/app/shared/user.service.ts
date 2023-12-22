import { Injectable } from '@angular/core';
import { config } from '../../models/config';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    const url = `${config.base_url}/users/login?username=${username}&password=${password}`;
    return this.http.get(url, { observe: 'response' });
  }
  //registering a new user
  register(username: string, password: string, email: string) {
    const url = `${config.base_url}/users`;
    const userData = { username, password, email };
    return this.http.post(url, userData, {observe: 'response' });
  }
  
}
