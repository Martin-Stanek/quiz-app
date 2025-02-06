import { Component, output } from '@angular/core';

@Component({
  selector: 'app-restart-button',
  imports: [],
  templateUrl: './restart-button.component.html',
  styleUrl: './restart-button.component.css',
})
export class RestartButtonComponent {
  restartAction = output<void>();

  onRestartClick(): void {
    this.restartAction.emit();
  }
}
