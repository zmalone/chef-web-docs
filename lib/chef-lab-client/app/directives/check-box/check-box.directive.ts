import { Directive, ElementRef, HostListener, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Directive({
  selector: '.check-box',
})
export class CheckBoxDirective {
  @Input()
  page: string

  constructor(private progressService?: ProgressService, private el?: ElementRef) {
    this.el = el
    this.progressService.activeUserProgress.subscribe(() => {
      if (this.progressService.isComplete('units', this.page)) {
        this.el.nativeElement.classList.add('check-box-selected')
        this.el.nativeElement.classList.remove('check-box')
      } else {
        this.el.nativeElement.classList.add('check-box')
        this.el.nativeElement.classList.remove('check-box-selected')
      }
    })
  }

}
