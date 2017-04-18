import { Component, OnInit, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'user-progress-stamp',
  templateUrl: './user-progress-stamp.component.html',
})
export class UserProgressStampComponent implements OnInit {
  public completed: boolean

  @Input()
  module: string

  @Input()
  track: string

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe(() => {
      if (this.module) {
        this.completed = !!this.progressService.isComplete('modules', this.module)
      } else if (this.track) {
        this.completed = !!this.progressService.isComplete('tracks', this.track)
      }
    })
  }
}
