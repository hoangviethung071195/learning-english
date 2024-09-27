import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.gard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    title: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz',
    title: 'Quiz',
    loadComponent: () =>
      import('./components/quiz/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'vocabulary',
    title: 'Vocabulary',
    loadComponent: () =>
      import('./components/vocabulary/vocabulary.component').then(
        (m) => m.VocabularyComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
