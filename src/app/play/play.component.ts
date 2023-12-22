import { CommonModule,  } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { PrefService } from '../shared/pref.service';
import { ScoresService } from '../shared/scores.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './play.component.html',
  styleUrl: './play.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayComponent implements OnInit{
  score = 0;
  finalScore = 0;
  ufo_hstep = 5;
  isGameOver = false;
  firedMissile = false;
  ufoid: any;
  pid: any;
  startTime!: number;
  gameTime!: number;
  mins!: number;

  @ViewChild('missile') missile!: ElementRef<HTMLImageElement>;
  @ViewChild('ufo') ufo!:  ElementRef<HTMLImageElement>;
  @ViewChild('points') points!: ElementRef;
  @ViewChild('timer') timer!: ElementRef;

  constructor(
    private prefService: PrefService, 
    private cdr: ChangeDetectorRef, 
    private scores: ScoresService,

  ) {}

  ngOnInit(): void {
    this.prefService.currentGameTime.subscribe(time => {
      this.gameTime = time;
      console.log("game time "+ this.gameTime);
      this.startTime = time;
      console.log("start time "+ this.startTime);
      this.mins = time / 60;
      console.log("mins"+ this.mins);
    }); 

  }

  ngAfterViewInit() {
    this.updateGameTimeDisplay();
    this.ufo.nativeElement.style.bottom = '450px';
    this.launchUFO();
  }

  launchUFO() {
    this.ufoid = setInterval(() => this.moveUFO(), 35);
  }

  moveUFO() {
    if (typeof window !== 'undefined') {
      let hpos_ufo = parseInt(this.ufo.nativeElement.style.left, 10);
      const width_ufo = parseInt(this.ufo.nativeElement.style.width, 10);
      const rLimit = window.innerWidth - width_ufo;
  
      if (hpos_ufo + this.ufo_hstep > rLimit || hpos_ufo + this.ufo_hstep < 0) {
        this.ufo_hstep *= -1;
      }
      hpos_ufo += this.ufo_hstep;
      this.ufo.nativeElement.style.left = `${hpos_ufo}px`;
    }

  }

  launch() {

    if(this.isGameOver){
      return;
    }

    const uLimit = window.innerHeight;
    let vpos_m = parseInt(this.missile.nativeElement.style.bottom);
    const vstep = 5;
    const misHeight = parseInt(this.missile.nativeElement.style.height);
  
    if (this.checkForAHit()) {
      clearInterval(this.pid);
      vpos_m = 10;
      this.firedMissile = false;
      this.score += 100;
      this.points.nativeElement.innerHTML = this.score.toString();
      this.ufo.nativeElement.src = 'assets/imgs/explosion.gif';
  
      setTimeout(() => {
        this.ufo.nativeElement.src = 'assets/imgs/ufo.png';
      }, 1000);

    } else {
      if (vpos_m + misHeight < uLimit - 60) {
        vpos_m += vstep;
        this.firedMissile = true;
      } else {
        vpos_m = 10;
        clearInterval(this.pid);
        this.firedMissile = false;
        this.score -= 25;
        this.points.nativeElement.innerHTML = this.score.toString();
      }
    }
  
    this.missile.nativeElement.style.bottom = vpos_m + 'px';
  }

  checkForAHit() {
    const hpos_ufo = parseInt(this.ufo.nativeElement.style.left);
    const vpos_ufo = parseInt(this.ufo.nativeElement.style.bottom);
    const width_ufo = parseInt(this.ufo.nativeElement.style.width);
  
    const vpos_m = parseInt(this.missile.nativeElement.style.bottom);
    const hpos_m = parseInt(this.missile.nativeElement.style.left);
    const width_m = parseInt(this.missile.nativeElement.style.width);
    const height_m = parseInt(this.missile.nativeElement.style.height);
  
    return vpos_m + height_m >= vpos_ufo &&
           hpos_m + (width_m / 2) >= hpos_ufo &&
           hpos_m + (width_m / 2) <= hpos_ufo + width_ufo;
  }

  moveMissileRight() {
    const rLimit = window.innerWidth;
    let hpos_m = parseInt(this.missile.nativeElement.style.left);
    const misWidth = parseInt(this.missile.nativeElement.style.width);
    const hstep = 5;
  
    if (hpos_m + misWidth + 5 < rLimit && !this.firedMissile) {
      hpos_m += hstep;
      this.missile.nativeElement.style.left = hpos_m + 'px';
    }
  }
  
  moveMissileLeft() {
    const hstep = 5;
    let hpos_m = parseInt(this.missile.nativeElement.style.left);
  
    if (hpos_m > 0 && !this.firedMissile) {
      hpos_m -= hstep;
      this.missile.nativeElement.style.left = hpos_m + 'px';
    }
  }
  
  @HostListener('window:keydown', ['$event'])
  keyboardController(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.moveMissileRight();
    } else if (event.key === 'ArrowLeft') {
      this.moveMissileLeft();
    } else if (event.key === ' ' && !this.firedMissile) {
      this.pullTrigger();
    }
  }

  gameOver() {
    this.isGameOver = true;
    console.log("in game over"+ this.isGameOver);
    //start time and game time should not have changed?
    console.log("mins"+ this.mins);
    console.log("start time "+ this.startTime);
    clearInterval(this.ufoid); 
    this.finalScore = this.score / this.mins;
    this.points.nativeElement.innerHTML = `Final punctuation: ${this.finalScore}`;
    this.cdr.markForCheck(); 
  }

  pullTrigger() {
    this.pid = setInterval(() => this.launch(), 10);
    this.firedMissile = true;
  }

  saveScore() {
    console.log('Score saved:', this.finalScore);
    console.log("start time "+ this.startTime);
    const token = localStorage.getItem('token');
    console.log('the toekn:', token);
    this.scores.saveUserScore(this.finalScore, 1, this.startTime).subscribe({
      next: (response) => {
        console.log('response', response);
        window.alert('your score: '+this.finalScore + ' was saved!');
      },
      error: (error) => {
        console.error('Registration error:', error);
        window.alert('Error while saving :(');
      }
    });
    this.isGameOver = false;
  }

  updateGameTimeDisplay() {
    if (this.gameTime !== null) {
      this.timer.nativeElement.textContent = `Time left: ${this.gameTime} seconds`;
      const countdown = setInterval(() => {
        this.gameTime -= 1;
        this.timer.nativeElement.textContent = `Time left: ${this.gameTime} seconds`;

        if (this.gameTime <= 0) {
          clearInterval(countdown);
          this.timer.nativeElement.textContent = '';
          this.gameOver();
        }
      }, 1000);
    }
  }
 }
