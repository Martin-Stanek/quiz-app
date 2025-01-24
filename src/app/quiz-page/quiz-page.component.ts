import { Component } from '@angular/core';
import { QuizTimerComponent } from "../quiz-timer/quiz-timer.component";
import { QuizQuestionsComponent } from '../quiz-questions/quiz-questions.component';

@Component({
    selector: 'app-quiz-page',
    imports: [QuizTimerComponent, QuizQuestionsComponent],
    standalone: true,
    templateUrl: './quiz-page.component.html',
    styleUrl: './quiz-page.component.css'
})
export class QuizPageComponent {
  quizFinished: boolean = false;
  resetTimer: boolean = false;
  resetQuestions: boolean = false;

  restartQuiz(){
    this.quizFinished = false;
    this.resetTimer = true;
    this.resetQuestions = true;
  }
  handleQuizFinished(): void {
    this.quizFinished = true;
  }
}
