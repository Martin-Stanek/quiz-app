import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  input,
  output,
  ɵINPUT_SIGNAL_BRAND_WRITE_TYPE,
  effect,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-timer',
  standalone: true,
  imports: [],
  templateUrl: './quiz-timer.component.html',
  styleUrl: './quiz-timer.component.css',
})
export class QuizTimerComponent implements OnInit {
  timeLeft = 20;
  timerSubscription: Subscription | null = null;
  resetTimerFlag = input<boolean>(false);
  timerFinished = output();
  reset = this.startTimer();
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.startTimer();
    effect(() => {
      if (this.resetTimerFlag()) {
        this.resetTimer();
        this.resetTimerFlag.set(false);
      }
    });

  }


  startTimer() {
    this.stopTimer();
    this.timeLeft = 20;
    this.timerSubscription = interval(1000).subscribe({
      next: (val) => {
        if (this.timeLeft == 0) {
          this.stopTimer();
          this.timerFinished.emit();
        } else {
          this.timeLeft--;
          this.timeLeft = 1;
        }
      },
    });
    this.destroyRef.onDestroy(() => {
      this.stopTimer();
    });
  }

  private resetTimer(): void {
    this.stopTimer();
    this.startTimer();
  }

  stopTimer() {
    if(this.timerSubscription){
    this.timerSubscription.unsubscribe();
    this.timerSubscription = null;
    }
  }
}
