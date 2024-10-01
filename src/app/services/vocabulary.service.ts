import { Injectable } from '@angular/core';
import { vocabularies } from '@app/assets/db';
import { Word } from '@app/models/word';
import { shuffleArray } from '@core/utils/array';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  private readonly STORAGE_KEY = 'vocabulary';

  getWords(status?: Word['status']): Observable<Word[]> {
    let words = this.getWordsFromLocal();
    if (!words.length) {
      words = vocabularies;
      this.saveWordsToLocal(words);
    }
    if (status) {
      words = words.filter((word) => word.status === status);
    }
    words.forEach((w) => {
      const vietnameseWords = shuffleArray(words.map((w) => w.vietnamese));
      let options = [
        vietnameseWords[1],
        vietnameseWords[2],
        vietnameseWords[3],
      ];
      if (!options.includes(w.vietnamese)) {
        options[0] = w.vietnamese;
        options = shuffleArray(options);
      }
      w.options = options;

      const enWords = shuffleArray(words.map((w) => w.english));
      let enOptions = [enWords[1], enWords[2], enWords[3]];
      if (!enOptions.includes(w.english)) {
        enOptions[0] = w.english;
        enOptions = shuffleArray(enOptions);
      }
      w.enOptions = enOptions;
    });
    return of(words);
  }

  updateWords(updatedWords: Word[]) {
    let words = this.getWordsFromLocal();
    if (!words.length) {
      words = vocabularies;
    }
    words.forEach((w) => {
      const match = updatedWords.find((update) => update.id === w.id);
      if (match) {
        w.status = match.status;
      }
    });
    this.saveWordsToLocal(words);
    return of(updatedWords);
  }

  addWord(newWord: Word) {
    const words = this.getWordsFromLocal();
    newWord.id = Math.random();
    words.unshift(newWord);
    this.saveWordsToLocal(words);
    return of(newWord);
  }

  deleteWord(wordId: number) {
    let words = this.getWordsFromLocal();
    words = words.filter((w) => w.id !== wordId);
    this.saveWordsToLocal(words);
    return of(wordId);
  }

  private saveWordsToLocal(words: Word[]) {
    words.forEach((w) => (w.checked = false));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(words));
  }

  private getWordsFromLocal(): Word[] {
    const savedWords = localStorage.getItem(this.STORAGE_KEY);
    return savedWords ? JSON.parse(savedWords) : [];
  }
}
