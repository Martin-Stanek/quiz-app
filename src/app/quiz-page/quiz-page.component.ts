import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject} from '@angular/core';
import { interval } from 'rxjs';
import { Question } from '../models/question.model';
import { QuizTimerComponent } from "../quiz-timer/quiz-timer.component";

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [QuizTimerComponent],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
})
export class QuizPageComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private httpClient = inject(HttpClient);
  timeLeft: number = 20;
  questions: Question[] = [];
  currentIndex=0;
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
  onTimeLeftChanged(newTime: number): void {
    this.timeLeft = newTime; 
    if(this.timeLeft==0){
      this.resetQuiz();
    }
  }
  answerSelected(option: any ){

  }
  useHelp(){

  }
  submitAnswer(){

  }
  resetQuiz(){
    
  }
}
