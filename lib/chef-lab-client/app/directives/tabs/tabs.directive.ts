import { Directive, ElementRef, HostListener, Input, AfterViewInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

@Directive({
  selector: '.tabs',
})
export class TabsDirective implements AfterViewInit {

  constructor(
    private el: ElementRef,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    const children = Array.from(this.el.nativeElement.children)
    children.forEach((li: any) => {
      li.onclick = (event) => {
        const link = event.target.hash.substr(1)
        this.router.navigate([`/${link}`])
      }
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const id = `#${event.url.substr(1)}Tab`
        setTimeout(() => {
          const el = this.el.nativeElement.querySelector(id)
          if (el) el.click()
        }, 0)
      }
    })
  }
}
