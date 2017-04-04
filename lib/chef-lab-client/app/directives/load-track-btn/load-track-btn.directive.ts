import {Directive, ElementRef, OnInit, Input, HostListener, Renderer} from '@angular/core'
import {TrackDisplayService} from '../../services/track-display.service'

@Directive({
  selector: '.load-track-btn',

})
export class LoadTrackBtnDirective implements OnInit {
  @Input()
  total: number

  constructor(private el?: ElementRef,
              private trackDisplay?: TrackDisplayService,
              private renderer?: Renderer) {
  }

  ngOnInit() {
    this.trackDisplay.setTrackDisplayCounter()
    this.trackLoadMoreBtn()
   }

  @HostListener('click', ['$event'])
  clicked(e) {
    e.preventDefault()
    this.trackDisplay.setTrackDisplayCounter()
  }

  trackLoadMoreBtn() {
    this.trackDisplay.getTrackDisplayCounter().subscribe((trackCounter) => {
      if (trackCounter >= this.total) {
        this.hideBtn()
      } else {
        this.showBtn()
      }
    })
  }

  hideBtn() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none')
  }

  showBtn() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', '')
  }
}
