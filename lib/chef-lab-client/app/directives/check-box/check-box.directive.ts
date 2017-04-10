import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Directive({
  selector: '.check-box',
})
export class CheckBoxDirective implements OnInit {
  @Input()
  page: string

  constructor(private progressService?: ProgressService, private el?: ElementRef) {}

  ngOnInit() {
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
