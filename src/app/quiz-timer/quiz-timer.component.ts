import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  Input,
  SimpleChanges,
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
  @Input({ required: true }) resetTimerFlag: boolean = false;
  @Input() stopTimerFlag: boolean = false;
  //resetTimerFlag = input<boolean>(false);
  timerFinished = output();
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.startTimer();
    /*effect(() => {
      if (this.resetTimerFlag) {
        this.resetTimerFlag = false;
        this.resetTimer();
      }
    });*/
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resetTimerFlag']?.currentValue == true) {
      this.resetTimer();
    }
    if(changes['stopTimerFlag']?.currentValue == true){
      console.log('STOP TIMER FLAG TRUE DELETE ME');
    }
  }

  startTimer() {
    this.stopTimer();
    this.timerSubscription = interval(1000).subscribe({
      next: (val) => {
        if (this.timeLeft == 0) {
          this.stopTimer();
          this.timerFinished.emit();
        } else {
          this.timeLeft--;
        }
      },
    });
    this.destroyRef.onDestroy(() => {
      this.stopTimer();
    });
  }

  private resetTimer(): void {
    this.stopTimer();
    this.resetTimerFlag=false;
    this.timeLeft = 20;
    this.startTimer();
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }
}
