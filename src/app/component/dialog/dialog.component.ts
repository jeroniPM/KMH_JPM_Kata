import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogData } from '../../model/dialog-data';

@Component({
  selector: 'app-dialog',
  standalone: true,
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-content">
          <h2>{{ data.name }}</h2>
          @if ( data.id ) {
            <p>Id: {{ data.id }}</p>
          }
          @if ( data.title_id ) {
            <p>Title Id: {{ data.title_id }}</p>
          }
          @if ( data.season_id ) {
            <p>Season Id: {{ data.season_id }}</p>
          }
          <img src="https://picsum.photos/200" alt="Movie image" />
        <button (click)="close()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 20px 30px;
      border-radius: 8px;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
    }

    button {
      margin-top: 16px;
      cursor: pointer;
      display: flex;
      width: 40%;
      justify-content: center;
      align-self: center;
      font-size: 20px;
    }
  `]
})
export class DialogComponent {
  @Input() data!: DialogData;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}