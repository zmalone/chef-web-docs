import { Component, OnInit, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'user-module-progress',
  templateUrl: './user-module-progress.component.html',
})
export class UserModuleProgressComponent implements OnInit {
  public progress: number
  public started: boolean
  public completed: boolean

  @Input()
  module: string

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe((active) => {
      this.completed = this.progressService.isComplete('modules', this.module)
      this.started = this.progressService.getLastAccessed('modules', this.module)
      this.progress = this.progressService.getModuleProgress(this.module)
    })
  }
}
