import {
  Component,
  inject,
} from '@angular/core';
import { HelpButtonComponent } from '../../../shared/help-button/help-button.component';
import { SubmitButtonComponent } from '../../../shared/submit-button/submit-button.component';
import { RestartButtonComponent } from '../../../shared/restart-button/restart-button.component';
import { QuestionService } from '../../../core/services/question.service';
import { TimerService } from '../../../core/services/timer.service';
import { QuizTimerComponent } from '../quiz-timer/quiz-timer.component';
import { QuizQuestionsComponent } from '../quiz-questions/quiz-questions.component';
import { QuizStateService } from '../../../core/services/quiz-state.service';
import { ContinueButtonComponent } from "../../../shared/continue-button/continue-button.component";

@Component({
  selector: 'app-quiz-page',
  imports: [
    HelpButtonComponent,
    SubmitButtonComponent,
    RestartButtonComponent,
    QuizTimerComponent,
    QuizQuestionsComponent,
    ContinueButtonComponent
],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css',
})
export class QuizPageComponent {
  questionService = inject(QuestionService);
  timerService = inject(TimerService);
  quizStateService = inject(QuizStateService);

  restart(){
    this.quizStateService.reset(); 
    this.timerService.reset(); 
    this.questionService.reset()
  }
}