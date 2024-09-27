import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Word } from '@app/models/word';
import { cloneDeep } from 'lodash';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { VocabularyService } from '../../services/vocabulary.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ToastModule,
    ImageModule,
    GalleriaModule,
  ],
  providers: [MessageService, VocabularyService],
  template: `
    <div class="surface-card p-4 border-round-xl shadow-2 mb-4">
      <div class="flex align-items-center justify-content-between mb-4">
        <h2 class="text-2xl font-bold m-0">English Vocabulary</h2>
        <p-button
          label="Add New Word"
          icon="pi pi-plus"
          (onClick)="openDialog()"
        ></p-button>
      </div>

      <p-table
        [value]="vocabularies"
        [tableStyle]="{ 'min-width': '50rem' }"
        [paginator]="true"
        [rows]="10"
        [responsive]="true"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Word</th>
            <th>Definition</th>
            <th>Example</th>
            <th class="w-6rem">Image</th>
            <th class="w-8rem text-center">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-vocabulary>
          <tr>
            <td>{{ vocabulary.english }}</td>
            <td>{{ vocabulary.vietnamese }}</td>
            <td>{{ vocabulary.example }}</td>
            <td>
              <div
                *ngIf="vocabulary.imageUrls?.length"
                class="cursor-pointer flex align-items-start relative"
                (click)="showGalleria(vocabulary)"
              >
                <img
                  [src]="vocabulary.imageUrls[0]"
                  alt="Image"
                  width="50"
                  style="object-fit: cover; max-height: 50px;"
                />
                <span
                  *ngIf="vocabulary.imageUrls?.length > 1"
                  class="absolute top-0 left-50 bg-red-500 text-0 border-circle flex align-items-center justify-content-center text-xs"
                  style="width: 1.2rem; height: 1.2rem; transform: translate(50%, -50%);"
                >
                  {{ vocabulary.imageUrls.length }}
                </span>
              </div>
            </td>
            <td>
              <p-button
                icon="pi pi-pencil"
                (onClick)="editVocabulary(vocabulary)"
                styleClass="p-button-text"
                [disabled]="vocabulary.unableDelete"
              ></p-button>
              <p-button
                icon="pi pi-trash"
                (onClick)="deleteVocabulary(vocabulary)"
                styleClass="p-button-text p-button-danger"
                [disabled]="vocabulary.unableDelete"
              ></p-button>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog
        [(visible)]="dialogVisible"
        [style]="{ width: '500px' }"
        [header]="dialogMode === 'add' ? 'Add New Word' : 'Edit Word'"
        [modal]="true"
        styleClass="p-fluid"
      >
        <ng-template pTemplate="content">
          <div class="field mb-4">
            <label for="word" class="block mb-2">Word</label>
            <input
              pInputText
              id="word"
              [(ngModel)]="currentVocabulary.english"
              required
              autofocus
              class="w-full"
            />
          </div>
          <div class="field mb-4">
            <label for="definition" class="block mb-2">Definition</label>
            <input
              pInputText
              id="definition"
              [(ngModel)]="currentVocabulary.vietnamese"
              required
              class="w-full"
            />
          </div>
          <div class="field mb-4">
            <label for="example" class="block mb-2">Example</label>
            <input
              pInputText
              id="example"
              [(ngModel)]="currentVocabulary.example"
              required
              class="w-full"
            />
          </div>
          <div class="field mb-4">
            <label class="block mb-2">Images</label>
            <div class="p-inputgroup">
              <input
                pInputText
                [(ngModel)]="newImageUrl"
                placeholder="Enter image URL"
                class="w-full"
              />
              <button
                pButton
                type="button"
                icon="pi pi-plus"
                (click)="addImageUrl()"
                [disabled]="!newImageUrl.trim()"
              ></button>
            </div>
          </div>
          <div
            *ngIf="currentVocabulary.imageUrls?.length"
            class="mb-4 max-h-9rem overflow-auto"
          >
            <ul class="list-none p-0 m-0">
              @for (url of currentVocabulary.imageUrls; let i = $index; track i)
              {
              <li
                class="mb-2 flex align-items-center p-2 border-round surface-border surface-ground"
              >
                <img
                  [src]="url"
                  alt="Image preview"
                  class="w-3rem h-3rem border-round mr-3"
                  style="object-fit: cover;"
                />
                <input
                  pInputText
                  [ngModel]="url"
                  (ngModelChange)="updateImageUrl(i, $event)"
                  class="flex-grow-1 mr-2"
                />
                <button
                  pButton
                  type="button"
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger p-button-text"
                  (click)="removeImageUrl(i)"
                ></button>
              </li>
              }
            </ul>
          </div>
        </ng-template>

        <ng-template pTemplate="footer">
          <p-button
            label="Cancel"
            icon="pi pi-times"
            severity="secondary"
            (onClick)="hideDialog()"
          ></p-button>
          <p-button
            label="Save"
            icon="pi pi-check"
            (onClick)="saveVocabulary()"
          ></p-button>
        </ng-template>
      </p-dialog>

      <p-galleria
        [value]="images"
        [(visible)]="galleriaVisible"
        [responsiveOptions]="galleriaResponsiveOptions"
        [containerStyle]="{ 'max-width': '850px' }"
        [numVisible]="7"
        [circular]="true"
        [fullScreen]="true"
        [showItemNavigators]="true"
      >
        <ng-template pTemplate="item" let-item>
          <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
          <div class="grid grid-nogutter justify-content-center">
            <img
              [src]="item.thumbnailImageSrc"
              style="display: block; width: 50px; height: 50px; object-fit: cover;"
            />
          </div>
        </ng-template>
      </p-galleria>

      <p-toast></p-toast>
    </div>
  `,
})
export class VocabularyComponent implements OnInit {
  private messageService = inject(MessageService);
  private vocabularyService = inject(VocabularyService);

  vocabularies: Word[] = [];

  dialogVisible = false;
  dialogMode: 'add' | 'edit' = 'add';
  currentVocabulary: Word = {
    id: 0,
    english: '',
    vietnamese: '',
    example: '',
    imageUrls: [],
    status: 'not checked',
  };
  newImageUrl = '';

  galleriaVisible = false;
  images: any[] = [];
  galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  ngOnInit(): void {
    this.loadWords();
  }

  loadWords() {
    this.vocabularyService.getWords().subscribe((vocabularies) => {
      this.vocabularies = vocabularies;
    });
  }

  openDialog() {
    this.dialogMode = 'add';
    this.currentVocabulary = {
      id: 0,
      english: '',
      vietnamese: '',
      example: '',
      imageUrls: [],
      status: 'not checked',
    };
    this.newImageUrl = '';
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
  }

  editVocabulary(vocabulary: Word) {
    if (vocabulary.unableDelete) {
      this.messageService.add({
        severity: 'warning',
        summary: 'Warning',
        detail: 'Word is unable to edit',
      });
      return;
    }
    this.dialogMode = 'edit';
    this.currentVocabulary = cloneDeep(vocabulary);
    this.newImageUrl = '';
    this.dialogVisible = true;
  }

  addImageUrl() {
    if (this.newImageUrl.trim()) {
      if (!this.currentVocabulary.imageUrls) {
        this.currentVocabulary.imageUrls = [];
      }
      this.currentVocabulary.imageUrls.push(this.newImageUrl.trim());
      this.newImageUrl = '';
    }
  }

  removeImageUrl(index: number) {
    this.currentVocabulary.imageUrls!.splice(index, 1);
  }

  saveVocabulary() {
    if (this.currentVocabulary.unableDelete) {
      this.messageService.add({
        severity: 'warning',
        summary: 'Warning',
        detail: 'Word is unable to save',
      });
      return;
    }
    if (this.dialogMode === 'add') {
      this.vocabularyService
        .addWord(this.currentVocabulary)
        .subscribe((res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Word added successfully',
            });
            this.loadWords();
          }
        });
    } else {
      this.vocabularyService
        .updateWords([this.currentVocabulary])
        .subscribe((res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Word updated successfully',
            });
            this.loadWords();
          }
        });
    }
    this.hideDialog();
  }

  async deleteVocabulary(vocabulary: Word) {
    if (vocabulary.unableDelete) {
      this.messageService.add({
        severity: 'warning',
        summary: 'Warning',
        detail: 'Word is unable to delete',
      });
      return;
    }
    const res = await lastValueFrom(
      this.vocabularyService.deleteWord(vocabulary.id)
    );
    if (res) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Word deleted successfully',
      });
      this.loadWords();
    }
  }

  updateImageUrl(index: number, newUrl: string) {
    if (newUrl.trim()) {
      this.currentVocabulary.imageUrls![index] = newUrl.trim();
    }
  }

  showGalleria(vocabulary: Word) {
    this.images = vocabulary.imageUrls!.map((url) => ({
      itemImageSrc: url,
      thumbnailImageSrc: url,
    }));
    this.galleriaVisible = true;
  }
}
