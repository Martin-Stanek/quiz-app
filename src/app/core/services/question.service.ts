import { computed, inject, Injectable, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questions } from '../models/questions.model';
import { QuizStateService } from './quiz-state.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  http = inject(HttpClient);
  questions = signal<Questions[]>([]);
  currentIndex = signal(0);
  quizState = inject(QuizStateService);

  constructor() {
    this.http.get<Questions[]>('assets/questions.json').subscribe({
      next: (data) => this.questions.set(data),
      error: (err) => console.error('Error loading questions:', err),
    });
  }

  verifyAnswer(userAnswer: string): boolean {
    return this.currentQuestion()?.correctAnswer === userAnswer;
  }

  hasNextQuestion(): boolean {
    return this.currentIndex() < this.questions().length - 1;
  }

  currentQuestion = computed(() => {
    const index = this.currentIndex();
    const questions = this.questions();
    return index < questions.length ? questions[index] : null;
  });

  nextQuestion() {
    if (this.hasNextQuestion()) {
      this.currentIndex.update((i) => i + 1);
      this.quizState.showCorrectAnswer.set(false);
      this.quizState.selectedAnswer.set(null);
    } else {
      this.quizState.quizCompleted.set(true);
    }
  }

  checkAnswer(answer: string) {
    if (this.currentQuestion()?.correctAnswer === answer) {
      this.quizState.showCorrectAnswer.set(true);
    } else {
      this.quizState.failed.set(true);
    }
  }

  reset() {
    this.currentIndex.set(0);
    this.quizState.reset();
  }
}
