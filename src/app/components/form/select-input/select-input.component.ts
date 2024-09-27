import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  template: `
    <p-dropdown
      [options]="options"
      (onChange)="onSelectionChange($event)"
      [placeholder]="placeholder"
      [showClear]="true"
      styleClass="p-column-filter"
    >
      <ng-template let-option pTemplate="item">
        <span [class]="'status-badge status-' + option.value">{{
          option.label
        }}</span>
      </ng-template>
    </p-dropdown>
  `,
})
export class SelectInputComponent {
  @Input() options: any[] = [];
  @Input() placeholder = 'Select...';
  @Output() selectionChange = new EventEmitter<any>();

  onSelectionChange(event: any) {
    this.selectionChange.emit(event.value);
  }
}
