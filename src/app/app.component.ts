import { AsyncPipe } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChildElementRef } from '@app/models/contracts/element-ref';
import { AuthService } from '@shared/services/auth/auth.service';
import { AuthPendingComponent } from './auth-pending/auth-pending.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    AuthPendingComponent,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements AfterViewChecked {
  auth = inject(AuthService);
  sidebarVisible = false;
  private headerHeight = 0;
  private footerHeight = 0;
  @ViewChild('mainRef', { read: ElementRef }) mainRef: ChildElementRef;

  async ngAfterViewChecked() {
    if (this.mainRef) {
      this.mainRef!.nativeElement.style.maxHeight = `calc(100% - ${
        this.headerHeight + this.footerHeight
      }px)`;
      this.mainRef!.nativeElement.style.marginTop = `${this.headerHeight}px`;
    }
  }

  onHeaderHeight(headerHeight: number) {
    this.headerHeight = headerHeight;
  }

  onFooterHeight(footerHeight: number) {
    this.footerHeight = footerHeight;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
