import { Component, OnInit, HostBinding } from '@angular/core'
import { UserProfileService } from '../../services/user-profile.service'
import { ProgressService } from '../../services/progress.service'
import { SiteDataService } from '../../services/site-data.service'

@Component({
  selector: 'welcome-ribbon',
  templateUrl: 'welcome-ribbon.component.html',
})
export class WelcomeRibbonComponent implements OnInit {

  @HostBinding('class') classes = 'contain-to-grid fixed'

  @HostBinding('class.hidden')
  isHidden: boolean

  constructor(
    private userProfileService: UserProfileService,
    private progressService: ProgressService,
    private siteDataService: SiteDataService,
  ) {}

  ngOnInit() {
    document.getElementsByTagName('body')[0].classList.add('has-welcome')
    if (this.siteDataService.currentPage().id === 'getting-started-with-lcr') this.hideRibbon()
    if (localStorage.getItem('hideWelcome')) this.hideRibbon()
    this.userProfileService.isAuthenticated().subscribe((next) => {
      if (next) this.hideRibbon()
    })
    this.progressService.activeUserProgress.subscribe(() => {
      if (Object.keys(this.progressService.getAchievements()).length) this.hideRibbon()
    })
  }

  public hideRibbon() {
    this.isHidden = true
    localStorage.setItem('hideWelcome', 'true')
    document.getElementsByTagName('body')[0].classList.remove('has-welcome')
  }
}
