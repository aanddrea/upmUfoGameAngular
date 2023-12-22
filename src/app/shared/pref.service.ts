import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefService {
  //set defaults
  private gameTime = new BehaviorSubject<number>(60);
  private ufos = new BehaviorSubject<number>(1); 

  currentGameTime = this.gameTime.asObservable();
  currentUfos = this.ufos.asObservable();

  changeGameTime(time: number) {
    this.gameTime.next(time);
  }
  
  changeUfos(ufos: number) {
    this.ufos.next(ufos);
  }
}
