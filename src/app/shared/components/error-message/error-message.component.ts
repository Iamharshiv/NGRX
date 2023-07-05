import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-error-message',
  template: ` <div>{{ error }}</div>`,
  standalone: true,
  imports: [CommonModule],
})
export class ErrorMessageComponent {
  @Input() error: string = 'Something went wrong.';
}
