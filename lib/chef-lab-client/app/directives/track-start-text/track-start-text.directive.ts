import { Directive, OnInit, ElementRef, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Directive({
  selector: '.track-start-text',
})
export class TrackStartTextDirective implements OnInit {

  @Input()
  track: string

  constructor(
    private progressService?: ProgressService,
    private el?: ElementRef,
  ) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe(() => {
      if (this.progressService.getLastAccessed('tracks', this.track)) {
        this.el.nativeElement.innerHTML = 'Keep Learning'
      } else {
        this.el.nativeElement.innerHTML = 'Get Started'
      }
    })
  }
}
