import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = 'user';
  password: string = 'password';
  router = inject(Router);
  private authService = inject(AuthService);

  onLogin() {
    this.authService.login(this.username, this.password).subscribe((r) => {
      if (r) {
        this.router.navigate(['']);
      }
    });
  }
}
