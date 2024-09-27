import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-auth-pending',
  standalone: true,
  template: `
    <div class="auth-pending">
      <p>Verifying authentication status...</p>
      <p>Please wait.</p>
    </div>
  `,
  styles: [
    `
      .auth-pending 
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        height: 100vh
      
    `,
  ],
})
export class AuthPendingComponent {
}
