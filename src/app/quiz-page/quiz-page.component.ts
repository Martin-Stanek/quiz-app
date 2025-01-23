import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject} from '@angular/core';
import { interval } from 'rxjs';
import { Question } from '../models/question.model';

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
  timeLeft: number = 0;
  questions: Question[] = [];
  currentIndex=0;
  currentQuestion: Question | undefined;
  
  ngOnInit(): void {
    this.loadQuestion();
    this.startInterval();
  }
  loadQuestion(){
    const subscription = this.httpClient
    .get<Question[]>('assets/questions.json')
    .subscribe({
      next: (resData) => {
        this.questions = resData;
        this.currentQuestion = this.questions[this.currentIndex];
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  startInterval() {
    const subscription = interval(1000).subscribe({
      next: (val) => {
        this.timeLeft = val;
        if (this.timeLeft >= 60) {
        }
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  answerSelected(option: any ){

  }
  useHelp(){

  }
  submitAnswer(){

  }

}
