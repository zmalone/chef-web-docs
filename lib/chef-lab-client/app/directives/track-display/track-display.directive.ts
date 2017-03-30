import {Directive, ElementRef, OnInit, Input, Renderer} from '@angular/core'
import {TrackDisplayService} from '../../services/track-display.service'

@Directive({
  selector: '.track-display',
})
export class TrackDisplayDirective implements OnInit {
  @Input()
  order: number

  constructor(private el?: ElementRef,
              private trackDisplay?: TrackDisplayService,
              private renderer?: Renderer) {
  }

  ngOnInit() {
      this.showTracks()
  }

  showTracks() {
    this.trackDisplay.getTrackDisplayCounter().subscribe((trackCounter) => {
      if (this.order < trackCounter) {
        this.showTrack()
      } else {
        this.hideTrack()
      }
    })
  }

  hideTrack() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none')
  }

  showTrack() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', '')
  }
}
