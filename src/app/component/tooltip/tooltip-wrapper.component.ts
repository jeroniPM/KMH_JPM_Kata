import { Component, Input } from '@angular/core';

/* I GENERATED THIS TOOLTIP FROM CODE FROM W3SCHOOLS
   ADAPTED TO AN ANGULAR COMPONENT VERSION FOR SIMPLICITY
*/

@Component({
  selector: 'tooltip-wrapper',
  standalone: true,
  template: `
    <div class="tooltip">
      <ng-content></ng-content>
      <span class="tooltiptext">{{ text }}</span>
    </div>
  `,
  styles: [`
    .tooltip {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    .tooltiptext {
      visibility: hidden;
      width: max-content;
      max-width: 200px;
      background-color: black;
      color: #ffffff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 8px;
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      margin-left: 6px;
      opacity: 0;
      transition: opacity 0.2s ease;
      white-space: nowrap;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  `]
})
export class TooltipWrapperComponent {
  @Input() text: string = ''; // Tooltip text
}