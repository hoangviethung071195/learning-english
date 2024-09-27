import { Component, model } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RouterModule],
  template: `
    <p-sidebar
      [(visible)]="visible"
      styleClass="custom-sidebar"
      [baseZIndex]="10000"
      (onHide)="onHide()"
    >
      <h3>Menu</h3>
      <ul class="list-none p-0 m-0">
        <li class="mb-2">
          <a
            routerLink="/"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            (click)="onHide()"
          >
            <i
              class="pi pi-home pointer-events-none"
              style="font-size: 20px"
            ></i>
            Home
          </a>
        </li>
        <li class="mb-2">
          <a
            routerLink="/quiz"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            (click)="onHide()"
          >
            <i
              class="pi pi-question-circle pointer-events-none"
              style="font-size: 20px"
            ></i>
            Quiz
          </a>
        </li>
        <li class="mb-2">
          <a
            routerLink="/vocabulary"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            (click)="onHide()"
          >
            <i
              class="pi pi-question-circle pointer-events-none"
              style="font-size: 20px"
            ></i>
            Vocabulary
          </a>
        </li>
      </ul>
    </p-sidebar>
  `,
  styles: [],
})
export class SidebarComponent {
  visible = model(false);

  onHide() {
    console.log('onHide');
    this.visible.set(false);
  }
}
