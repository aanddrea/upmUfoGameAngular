import { Component } from '@angular/core';
import { TokenmgrService } from './shared/tokenmgr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task2';

  constructor(
    public tokenMgr: TokenmgrService
  ){}

}
