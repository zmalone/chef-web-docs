import { Component, OnInit, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'user-progress-counts',
  templateUrl: './user-progress-counts.component.html',
})
export class UserProgressCountsComponent implements OnInit {
  public numStarted: number
  public numCompleted: number

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe(() => {
      const { numStarted, numCompleted } = this.progressService.getProgressCounts()
      this.numStarted = numStarted
      this.numCompleted = numCompleted
    })
  }
}
