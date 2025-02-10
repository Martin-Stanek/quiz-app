import { Component, HostBinding, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  textDisplay = input.required<string>();
  disabled = input<boolean>(false);
  clickAction = output<void>();
  @HostBinding('class') class = '';

  onClick(): void {
    this.clickAction.emit();
  }
}
