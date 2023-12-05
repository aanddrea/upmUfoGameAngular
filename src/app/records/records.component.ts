import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsService } from './records.service';

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

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.recordsService.getRecords()
      .subscribe(
        (records: any[]) => {
          this.records = records;
        },
        error => {
          console.error('Error fetching records:', error);
        }
      );
  }
}
