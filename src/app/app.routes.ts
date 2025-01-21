import { Routes } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [ 
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'quiz',
    component: QuizPageComponent,
  },
];
