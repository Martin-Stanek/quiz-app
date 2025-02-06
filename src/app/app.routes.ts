import { Routes } from '@angular/router';
import { MainPageComponent } from './features/main-page/main-page.component';
import { QuizPageComponent } from './features/quiz/quiz-page/quiz-page.component';

export const routes: Routes = [ 
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'quiz',
    component: QuizPageComponent
  }
];
