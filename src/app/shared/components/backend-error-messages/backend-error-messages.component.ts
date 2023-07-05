import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBackendErrorInterface } from '../../types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backendErrors: IBackendErrorInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join('');
      return `${name} ${messages}`;
    });
  }
}
