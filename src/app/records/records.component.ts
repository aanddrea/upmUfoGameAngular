import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresService } from '../shared/scores.service';
import { TokenmgrService } from '../shared/tokenmgr.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
})
export class RecordsComponent implements OnInit {
  records: any[] = [];
  topRecords: any[] = [];  

  constructor(
    private scores: ScoresService,
    public tokenMgr: TokenmgrService,
  ){}

  ngOnInit(): void {
    this.getRecords();
    if(localStorage.getItem('token') != null){
      console.log(localStorage.getItem('username')+ " youre logged in");
      this.getUserRecords();
    }
  }

  getRecords(): void {
    this.scores.getRecords()
      .subscribe(
        (records: any[]) => {
          this.records = records;
        },
        error => {
          console.error('Error fetching records:', error);
        }
      );
  }
  getUserRecords(): void{
    const user = localStorage.getItem('username');
    if(user){
      this.scores.getUserRecords(user)
      .subscribe(
        (topRecords: any[]) => {
          this.topRecords = topRecords;
        },
        error => {
          console.error('Error fetching records:', error);
        }
      );
  }
  }
}
