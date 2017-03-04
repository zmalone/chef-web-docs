import { Component, OnInit, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'user-progress-bar',
  templateUrl: './user-progress-bar.component.html',
})
export class UserProgressBarComponent implements OnInit {
  public progress: number

  @Input()
  module: string

  constructor(
    private progressService: ProgressService,
  ) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe((data) => {
      const moduleData = (data && data.modules) ? data.modules : {}
      // TODO: Get the actual total number of steps in the module
      const totalNum = 10
      const numCompleted = Object.keys(moduleData).filter(key => {
        return (key.startsWith(this.module + '/') && moduleData[key].completed_at)
      }).length
      this.progress = Math.round(100 * (numCompleted / totalNum))
    })
  }
}
