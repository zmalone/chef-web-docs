import { Directive, OnInit, ElementRef, HostListener, Host, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Directive({
  selector: '.user-start-btn',
})
export class UserStartBtnDirective implements OnInit {
  @Input()
  href: string

  @Input()
  module: string

  constructor(private progressService?: ProgressService, private el?: ElementRef) {
    this.el = el
  }

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe((active) => {
      const lastUnit = this.progressService.getLastStarted('modules', this.module)
      // this.el.nativeElement.innerHTML = 'Revisit'
      if (lastUnit.url) {
        this.el.nativeElement.innerHTML = 'Continue'
      } else {
        this.el.nativeElement.innerHTML = 'Start'
      }
    })
  }

  @HostListener('click', ['$event'])
  clicked(e) {
    e.preventDefault()
    const lastUnit = this.progressService.getLastStarted('modules', this.module)
    window.location.href = lastUnit.url || this.href
  }
}
