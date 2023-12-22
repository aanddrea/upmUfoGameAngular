import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenmgrService {
  private _isLoggedIn = false;

  constructor() { }

  //saving the token 
  saveToken(token: string){
    localStorage.setItem('token', token);
  }
  //saving the username
  saveUsername(username: string){
    localStorage.setItem('username', username);
  }

  //clearing the token to logout
  clearToken(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.alert("You have been logged out.");
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn || !!localStorage.getItem('token');
  }
}