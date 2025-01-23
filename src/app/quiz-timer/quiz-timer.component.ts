import { Component, DestroyRef, inject, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-quiz-timer',
  standalone: true,
  imports: [],
  templateUrl: './quiz-timer.component.html',
  styleUrl: './quiz-timer.component.css',
})
export class QuizTimerComponent implements OnInit
{
  timeLeft: number = 20;
  private destroyRef = inject(DestroyRef);
  @Output() timeLeftChanged = new EventEmitter<number>();
  @Input() resetTimerFlag = false;

  ngOnInit(): void {
      this.startTimer();
  }
  
  startTimer() {
    const subscription = interval(1000).subscribe({
      next: (val) => {
        this.timeLeftChanged.emit(--this.timeLeft);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  resetTimer() {
    clearInterval(this.timeLeft); 
    this.timeLeft = 20; 
    this.startTimer(); 
    this.resetTimerFlag = false;
  }
  stopTimer(){
    
  }
}
