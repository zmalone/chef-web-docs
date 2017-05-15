import { Component, OnInit, Input, HostBinding } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'user-progress-stamp',
  templateUrl: './user-progress-stamp.component.html',
})
export class UserProgressStampComponent implements OnInit {

  @HostBinding('class.hidden')
  isHidden: boolean

  @Input()
  module: string

  @Input()
  track: string

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe(() => {
      if (this.module) {
        this.isHidden = !this.progressService.isComplete('modules', this.module)
      } else if (this.track) {
        this.isHidden = !this.progressService.isComplete('tracks', this.track)
      }
    })
  }
}
