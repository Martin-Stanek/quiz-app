import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css'
})
export class QuizPageComponent implements OnInit{
  
  private destroyRef = inject(DestroyRef);
  timervalue: number=0;

  ngOnInit(): void{
    const subscription = interval(1000).subscribe({
      next: (val) => this.timervalue = val
        });
        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        })
  }
}
