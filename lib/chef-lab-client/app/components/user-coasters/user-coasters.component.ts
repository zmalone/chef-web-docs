import { Component, OnInit } from '@angular/core'
import { ProgressService } from '../../services/progress.service'
interface Coaster { image_url: string }

@Component({
  selector: 'user-coasters',
  templateUrl: './user-coasters.component.html',
})
export class UserCoastersComponent implements OnInit {
  public coasters: Array<Coaster> = []

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe((data) => {
      const allCoasters = (window as any).coasters
      this.coasters = []
      Object.keys(this.progressService.getAchievements()).forEach(achievement => {
        const coasters = allCoasters.filter(item => item.id === achievement)
        if (coasters) this.coasters.push(coasters[0])
      })
    })
  }
}
