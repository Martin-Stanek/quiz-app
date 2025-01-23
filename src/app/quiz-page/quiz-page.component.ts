import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
})
export class QuizPageComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private httpClient = inject(HttpClient);
  timervalue: number = 0;
  questions: any;

  ngOnInit(): void {
    this.loadQuestion();
    this.startInterval();
  }
  loadQuestion(){
    const subscription = this.httpClient
    .get('assets/questions.json')
    .subscribe({
      next: (resData) => {
        this.questions = resData;
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  startInterval() {
    const subscription = interval(1000).subscribe({
      next: (val) => {
        this.timervalue = val;
        if (this.timervalue >= 5) {
          console.log('>5!!!');
        }
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
