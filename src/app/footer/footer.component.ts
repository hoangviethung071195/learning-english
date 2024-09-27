import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { ChildElementRef } from '@app/models/contracts/element-ref';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass',
})
export class FooterComponent {
  @Output() footerHeight = new EventEmitter<number>();
  @ViewChild('footerRef', { read: ElementRef }) footerRef: ChildElementRef;
  ngZone = inject(NgZone);

  ngAfterViewInit() {
    this.footerHeight.emit(this.footerRef?.nativeElement.offsetHeight);
  }
}
