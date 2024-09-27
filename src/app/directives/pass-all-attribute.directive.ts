import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPassAllAttributes]',
  standalone: true,
})
export class PassAllAttributesDirective implements OnInit {
  @Input() appPassAllAttributes = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const attrs = this.el.nativeElement.attributes;
  }
}
