import { Component, OnChanges, Input } from '@angular/core'
import { SiteDataService } from '../../services/site-data.service'
interface Coaster { image_url: string }

@Component({
  selector: 'user-coasters',
  templateUrl: './user-coasters.component.html',
})
export class UserCoastersComponent implements OnChanges {
  public coasters: Array<Coaster> = []

  @Input()
  achievements: Object

  constructor(
    private siteDataService: SiteDataService,
  ) {}

  ngOnChanges() {
    if (!this.achievements) return
    const allCoasters = this.siteDataService.coasters()
    this.coasters = []
    Object.keys(this.achievements).forEach(achievement => {
      const coasters = allCoasters.filter(item => item.id === achievement)
      if (coasters.length) this.coasters.push(coasters[0])
    })
  }
}
