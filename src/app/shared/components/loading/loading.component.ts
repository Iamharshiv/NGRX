import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-loading',
  template: `
    <!-- <div class="loading-container">
      <mat-spinner></mat-spinner>
    </div> -->
    <ngx-spinner type="ball-scale"> Loading... </ngx-spinner>
  `,

  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, NgxSpinnerModule],
  styles: `
      .loading-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
      }
    `,
})
export class LoadingComponent {
  //   @Input() isLoading: boolean = false;
  //   constructor(private spinner: SpinnerService) {}
  //   ngOnChanges(changes: SimpleChanges): void {
  //     //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //     //Add '${implements OnChanges}' to the class.
  //     console.log(changes, this.isLoading);
  //     if (this.isLoading) this.spinner.showSpinner();
  //     else this.spinner.hideSpinner();
  //   }
}
