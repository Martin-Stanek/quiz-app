import { Component, inject, OnInit } from '@angular/core';
import { TimerService } from '../../../core/services/timer.service';

@Component({
  selector: 'app-quiz-timer',
  imports: [],
  templateUrl: './quiz-timer.component.html',
  styleUrl: './quiz-timer.component.css',
})
export class QuizTimerComponent implements OnInit{
  timerService = inject(TimerService);

  ngOnInit(): void {
      this.timerService.start();
  }
  
  ngOnDestroy() {
    this.timerService.stop();
  }
}
