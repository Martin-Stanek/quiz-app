import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizStateService {
  selectedAnswer = signal<string | null>(null);
  failed = signal(false);
  quizCompleted = signal(false);
  showCorrectAnswer = signal(false);

  reset() {
    this.selectedAnswer.set(null);
    this.failed.set(false);
    this.quizCompleted.set(false);
    this.showCorrectAnswer.set(false);
  }
}