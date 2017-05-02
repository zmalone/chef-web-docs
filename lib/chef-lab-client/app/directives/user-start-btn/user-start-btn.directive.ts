import { Directive, OnInit, ElementRef, HostListener, Host, Input } from '@angular/core'
import { SiteDataService } from '../../services/site-data.service'
import { ProgressService } from '../../services/progress.service'

@Directive({
  selector: '.user-start-btn',
})
export class UserStartBtnDirective implements OnInit {
  @Input()
  href: string

  @Input()
  module: string

  constructor(
    private siteDataService?: SiteDataService,
    private progressService?: ProgressService,
    private el?: ElementRef,
  ) {
    this.el = el
  }

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe((active) => {
      if (this.isComplete()) {
        this.el.nativeElement.innerHTML = 'Revisit'
      } else if (this.isStarted()) {
        this.el.nativeElement.innerHTML = 'Continue'
      } else {
        this.el.nativeElement.innerHTML = 'Start'
      }
    })
  }

  @HostListener('click', ['$event'])
  clicked(e) {
    e.preventDefault()
    window.location.href = (!this.isComplete() && this.isStarted() && this.getLastUrl()) || this.href
  }

  isStarted() {
    return this.progressService.isStarted('modules', this.module)
  }

  isComplete() {
    return this.progressService.isComplete('modules', this.module)
  }

  getLastUrl() {
    const lastUnit = this.progressService.getLastAccessed('modules', this.module)
    const moduleData = this.siteDataService.dataTree().modules
    return (lastUnit && moduleData[lastUnit.id]) ? moduleData[lastUnit.id].url : ''
  }
}
