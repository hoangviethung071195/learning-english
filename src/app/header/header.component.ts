import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { ChildElementRef } from '@app/models/contracts/element-ref';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  titleService = inject(Title);
  title: any;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() headerHeight = new EventEmitter<number>();
  @ViewChild('toolbarRef', { read: ElementRef }) toolbarRef: ChildElementRef;

  ngAfterViewInit() {
    this.title = this.route.snapshot.data;
    console.log('this.title ', this.title);
    console.log('route ', this.route);
    this.headerHeight.emit(
      this.toolbarRef?.nativeElement?.firstElementChild?.getBoundingClientRect?.()
        .height
    );
  }

  onMenuToggle() {
    this.menuToggle.emit();
  }
}
