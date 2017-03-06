import { Directive, ElementRef, HostListener, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Directive({
  selector: '.module-next-btn',
})
export class ModuleNextBtnDirective {
  @Input()
  href: string

  constructor(private progressService?: ProgressService) {
  }

  @HostListener('click', ['$event'])
  clicked(e) {
    e.preventDefault()
    const win = (window as any)
    this.progressService.complete(win.currentSection, win.currentPageId)
      .subscribe(
        () => {},
        err => {
          window.location.href = this.href
        },
        () => {
          window.location.href = this.href
        },
      )
  }
}
