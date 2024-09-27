import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Word } from '@app/models/word';
import { shuffleArray } from '@core/utils/array';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { VocabularyService } from '../../services/vocabulary.service';
import { WordListComponent } from '../word-list/word-list.component';
import { FilterPipe } from '@core/pipes/filter/filter.pipe';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    RadioButtonModule,
    FormsModule,
    WordListComponent,
    DropdownModule,
    FilterPipe,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.sass',
})
export class QuizComponent implements OnInit {
  words: Word[] = [];
  currentWord: Word | undefined;
  selectedAnswer = '';
  quizType = '';
  quizCompleted = false;

  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.quizType = params['type'];
      this.loadWords();
    });
  }

  newQuiz() {
    this.quizCompleted = false;
    this.loadWords();
  }

  loadWords() {
    this.vocabularyService
      .getWords(this.quizType as Word['status'])
      .subscribe((words) => {
        this.words = shuffleArray(words);
        if (words.length) {
          this.currentWord = this.words[0];
        } else {
          this.stopQuiz();
        }
      });
  }

  nextWord() {
    this.currentWord = this.words.filter((w) => !w.checked)[0];
    if (!this.currentWord) {
      this.stopQuiz();
    }
  }

  stopQuiz() {
    this.quizCompleted = true;
    this.vocabularyService.updateWords(this.words);
  }

  retakeQuiz() {
    this.quizCompleted = false;
  }

  checkAnswer(selectedAnswer: string, isSkipAnswer?: boolean) {
    this.currentWord!.checked = true;
    if (isSkipAnswer) {
      this.currentWord!.status = 'failed';
    } else {
      const isCorrect = selectedAnswer === this.currentWord?.vietnamese;
      const w = this.words.find((w) => w.id === this.currentWord?.id);
      if (w) {
        if (isCorrect) {
          w.status = 'passed';
        } else {
          w.status = 'failed';
        }
      }
    }
  }

  processQuizz(selectedAnswer: string) {
    this.selectedAnswer = selectedAnswer;
    this.checkAnswer(selectedAnswer);
    setTimeout(() => this.nextWord(), 1000);
  }

  skipQuestion() {
    this.checkAnswer('', true);
    this.nextWord();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key >= '1' && event.key <= '3') {
      const index = parseInt(event.key) - 1;
      if (
        this.currentWord?.options?.length &&
        index >= 0 &&
        index < this.currentWord?.options?.length
      ) {
        const selectedAnswer = this.currentWord.options[index];
        this.processQuizz(selectedAnswer);
      }
    }
    if (event.key === 'ArrowRight') {
      this.skipQuestion();
    }
    if (event.key === 'Enter') {
      this.stopQuiz();
    }
  }
}
