import { Component, OnInit, Input } from '@angular/core'
import { SiteDataService } from '../../services/site-data.service'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'user-track-progress',
  templateUrl: './user-track-progress.component.html',
})
export class UserTrackProgressComponent implements OnInit {
  public modules: Array<Boolean>

  @Input()
  track: string

  constructor(
    private siteDataService: SiteDataService,
    private progressService: ProgressService,
  ) {}

  ngOnInit() {
    const trackData = this.siteDataService.dataTree().tracks[this.track]
    const modules = trackData && trackData.modules || []
    this.progressService.activeUserProgress.subscribe(data => {
      data = data['modules'] || {}
      this.modules = modules.map(moduleId => {
        return data[moduleId] && data[moduleId].completed_at
      })
    })
  }

  public positionStyles(complete: string) {
    if (!complete) return {}

    // "Randomize" the stamp position using:
    // - The completed time in seconds, an essentially random number between 0 and 59
    // - The average ASCII character code of the track title which prevents multiple tracks with
    //   the same module (and even the same track name length) from having the same stamp positions
    const offsetX = 5
    const offsetY = 8
    const seconds = Number(complete.match(/:\d{2}:(\d{2})/)[1])
    const trackChars = (this.track.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) / this.track.length)
    const seed = seconds + trackChars
    const x = Math.round(Math.cos(seed) * offsetX)
    const y = Math.round(Math.sin(seed) * offsetY)
    return {
      left: x + 'px',
      top: y + 'px',
    }
  }
}
