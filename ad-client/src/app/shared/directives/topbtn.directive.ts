import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[topbtn]'
})
export class TopbtnDirective {

  constructor(private el: ElementRef, private r: Renderer2) {
    this.r.setStyle(this.el.nativeElement, 'display', 'none')
  }

  @HostListener("window:scroll", [])
  onWindowScroll($event) {
    const scrollForSafary = document.body.scrollTop
    const scrollForOthers = document.documentElement.scrollTop

    if (scrollForOthers > 200 || scrollForSafary > 500) {
      this.r.setStyle(this.el.nativeElement, 'display', 'block')
    } else {
      this.r.setStyle(this.el.nativeElement, 'display', 'none')
    }
  }

}
