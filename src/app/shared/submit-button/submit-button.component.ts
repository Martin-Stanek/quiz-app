import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  imports: [],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent {
  disabled = input.required<boolean>();
  submitAction = output<void>();

  onSubmitClick(): void {
    this.submitAction.emit();
  }
}
