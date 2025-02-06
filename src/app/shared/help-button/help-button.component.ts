import { Component, input, output, Output } from '@angular/core';

@Component({
  selector: 'app-help-button',
  imports: [],
  templateUrl: './help-button.component.html',
  styleUrl: './help-button.component.css',
})
export class HelpButtonComponent {
  helpRequested = output<void>();

  onHelpClick(): void {
    console.log('Sorry, have not implemented that one yet');
    this.helpRequested.emit();
  }
}
