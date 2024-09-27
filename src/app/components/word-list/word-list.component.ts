import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Table } from 'primeng/table';
import { SearchInputComponent } from '../form/search-input/search-input.component';
import { SelectInputComponent } from '../form/select-input/select-input.component';
import { Word } from '@app/models/word';
import { PassAllAttributesDirective } from '@app/directives/pass-all-attribute.directive';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    SearchInputComponent,
    SelectInputComponent,
    PassAllAttributesDirective,
  ],
  template: `
    <div class="card min-h-10">
      <p-table
        #dt
        [value]="words"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        [tableStyle]="{ 'min-width': '50rem', 'min-height': '280px' }"
        [rowHover]="true"
        dataKey="id"
        [globalFilterFields]="['english', 'vietnamese', 'status']"
        [style]="{ 'min-height': '300px' }"
      >
        <ng-template pTemplate="caption">
          <div class="flex justify-content-end mb-3">
            <app-search-input
              (search)="dt.filterGlobal($event, 'contains')"
              placeholder="Search keyword"
            ></app-search-input>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th>English</th>
            <th>Vietnamese</th>
            <th>Status</th>
          </tr>
          <tr>
            <th>
              <app-search-input
                (search)="dt.filter($event, 'english', 'contains')"
                placeholder="Search by English"
              ></app-search-input>
            </th>
            <th>
              <app-search-input
                (search)="dt.filter($event, 'vietnamese', 'contains')"
                placeholder="Search by Vietnamese"
              ></app-search-input>
            </th>
            <th>
              <app-select-input
                [options]="statuses"
                (selectionChange)="dt.filter($event, 'status', 'equals')"
                placeholder="Select Status"
              ></app-select-input>
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-word>
          <tr>
            <td>{{ word.english }}</td>
            <td>{{ word.vietnamese }}</td>
            <td>
              <span [class]="'status-badge status-' + word.status">
                {{ word.status }}
              </span>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
})
export class WordListComponent {
  @Input() words: Word[] = [];

  statuses = [
    { label: 'Passed', value: 'passed' },
    { label: 'Failed', value: 'failed' },
    { label: 'Not Checked', value: 'not checked' },
  ];

  ngOnInit() {
    this.words = this.words.map((word, index) => ({
      ...word,
      id: index + 1,
    }));
  }
}
