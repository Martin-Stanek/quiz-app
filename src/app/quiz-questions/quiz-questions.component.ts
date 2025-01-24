import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, Input, OnInit, output } from '@angular/core';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-quiz-questions',
  imports: [],
  standalone: true,
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.css'
})
export class QuizQuestionsComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private httpClient = inject(HttpClient);
  currentQuestion: Question | undefined;
  questions: Question[] = [];
  currentIndex=0;
  selectedOption: any;
  answer?: boolean | null = null;
  quizFinished = output<boolean>();
  finished: boolean = false;
  @Input() restartQuiz?: boolean;

  ngOnInit(): void {
    this.loadQuestion();
  }
  ngOnChanges(){
    if(this.restartQuiz==true){
      this.restartQuiz=false;
      this.resetQuestions();
    }
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

  answerSelected(option: any){
    this.selectedOption = option;
  }

  useHelp(){

  }
  submitAnswer(){
    if(this.selectedOption==this.currentQuestion?.answer){
      this.answer=true;
    }
    else{
      this.answer=false;
      this.finished=true;
      this.quizFinished.emit(true);
    }
  }
  nextQuestion(){
    this.answer=null;
    this.currentQuestion = this.questions[++this.currentIndex];
  }
  resetQuestions(){
    this.finished=false;
    this.currentQuestion = this.questions[0];
  }
}
