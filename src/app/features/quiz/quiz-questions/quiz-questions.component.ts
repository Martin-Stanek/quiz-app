import { Component, input, output } from '@angular/core';
import { Questions } from '../../../core/models/questions.model';

@Component({
  selector: 'app-quiz-questions',
  imports: [],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.css',
})
export class QuizQuestionsComponent {
  currentQuestion = input.required<Questions | null>();
  answerSelected = output<string>(); 
  
  selectAnswer(selectedOption: string) {
    this.answerSelected.emit(selectedOption); 
  }
}
