import { Component, output } from '@angular/core';

@Component({
  selector: 'app-continue-button',
  imports: [],
  templateUrl: './continue-button.component.html',
  styleUrl: './continue-button.component.css'
})
export class ContinueButtonComponent {
  continueAction = output<void>();

  onContinueClick(): void{
    this.continueAction.emit();
  }
}
