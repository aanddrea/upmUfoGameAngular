import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrefService } from '../shared/pref.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pref',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './pref.component.html',
  styleUrl: './pref.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefComponent {
  selectedGameTime: number;

  constructor(private prefService: PrefService) {
    this.selectedGameTime = 60; // default value
  }
  
  updateGameTime(newTime: number) {
    this.prefService.changeGameTime(newTime)
  }

  updateUfos(newUfos: number) {
    this.prefService.changeGameTime(newUfos);
  }
  savePreferences() {
    this.updateGameTime(this.selectedGameTime);
    window.alert('Preferences saved successfully!');
  }
 }
