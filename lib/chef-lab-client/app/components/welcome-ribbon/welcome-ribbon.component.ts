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
    this.userProfileService.isAuthenticated().subscribe(isSignedIn => {
      if (isSignedIn || !this.showRibbon()) this.hideRibbon()
    })
    this.progressService.activeUserProgress.subscribe(() => {
      if (Object.keys(this.progressService.getAchievements()).length) this.hideRibbon()
    })
  }

  public showRibbon(event?: Event) {
    if (event) event.preventDefault()
    if (localStorage.getItem('hideWelcome')) return false
    if (this.siteDataService.currentPage().id === 'getting-started-with-lcr') return false

    this.isHidden = false
    document.getElementsByTagName('body')[0].classList.add('has-welcome')
    return true
  }

  public hideRibbon(event?: Event) {
    if (event) event.preventDefault()
    this.isHidden = true
    localStorage.setItem('hideWelcome', 'true')
    document.getElementsByTagName('body')[0].classList.remove('has-welcome')
  }
}
