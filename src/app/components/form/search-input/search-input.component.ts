import {
  Component,
  Output,
  EventEmitter,
  model,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  template: `
    <span class="p-input-icon-left">
      <i class="pi pi-search"></i>
      <input
        pInputText
        type="text"
        [placeholder]="placeholder()"
        class="p-inputtext-sm"
        [(ngModel)]="keyword"
      />
    </span>
  `,
})
export class SearchInputComponent implements OnInit {
  placeholder = input('Search...');
  keyword = model('');
  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.keyword.subscribe((kw) => this.search.emit(kw));
  }

  clear() {
    this.keyword.set('');
  }
}
