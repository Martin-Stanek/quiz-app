import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject} from '@angular/core';
import { Question } from '../models/question.model';
import { QuizTimerComponent } from "../quiz-timer/quiz-timer.component";

@Component({
    selector: 'app-quiz-page',
    imports: [QuizTimerComponent],
    templateUrl: './quiz-page.component.html',
    styleUrl: './quiz-page.component.css'
})
export class QuizPageComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private httpClient = inject(HttpClient);
  timerDuration: number = 20;
  questions: Question[] = [];
  currentIndex=0;
  quizFinished: boolean = false;
  resetTimer: boolean = false;
  currentQuestion: Question | undefined;
  ngOnInit(): void {
    this.loadQuestion();
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
  answerSelected(option: any ){

  }
  useHelp(){

  }
  submitAnswer(){

  }
  restartQuiz(){
    this.quizFinished = false;
    this.resetTimer = true;
  }
  handleTimerFinished(): void {
    alert('Time is up!');
    this.quizFinished = true;
  }
}
