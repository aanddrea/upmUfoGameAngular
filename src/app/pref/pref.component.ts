import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pref',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pref.component.html',
  styleUrl: './pref.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefComponent { }
