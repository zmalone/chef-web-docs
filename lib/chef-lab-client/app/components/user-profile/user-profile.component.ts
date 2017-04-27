import { Component, OnInit, Input } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { UserProfileService } from '../../services/user-profile.service'
import { ProgressService } from '../../services/progress.service'
import { SiteDataService } from '../../services/site-data.service'
import { User } from '../../model'
import { COUNTRY } from './data/countries'

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user: User
  achievements: Object
  userInfo: any
  frmStatus: boolean
  updateStatus: boolean
  countries: any

  @Input()
  publicProfile: string

  constructor(
    private userProfileService: UserProfileService,
    private progressService: ProgressService,
    private siteDataService: SiteDataService,
    private router: Router,
  ) {
    this.user = <User> {}
    this.userInfo = <User> {}
  }

  ngOnInit() {
    this.countries = COUNTRY
    this.updateStatus = false
    if (this.publicProfile) {
      this.bindToPublicProfile()
    } else {
      this.bindToPrivateProfile()
    }
  }

  bindToPublicProfile() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const userId = event.url.substr(1)
        if (userId) {
          this.userProfileService.loadPublicProfile(userId).subscribe(userInfo => {
            this.user = userInfo.profile
            this.achievements = userInfo.progress.achievements
          },
          err => {
            window.location.href = '/error.html'
          })
        } else {
          window.location.href = '/error.html'
        }
      }
    })
  }

  bindToPrivateProfile() {
    this.userProfileService.isAuthenticated().subscribe(next => {
      if (!next) window.location.href = '/'
    })
    this.userProfileService.userProfile.subscribe(user => {
      this.user = user
      this.userInfo = Object.assign({}, this.user)
    })
    this.progressService.activeUserProgress.subscribe(() => {
      this.achievements = this.progressService.getAchievements()
    })
  }

  updateUserProfile() {
    this.userProfileService.updateUserProfile(Object.assign({}, this.userInfo))
      .subscribe(
        () => {
          window.scrollTo(0, 0)
          this.updateStatus = true
          return true
        },
      )
  }

  showForm() {
    this.frmStatus = true
  }

  hideForm() {
    this.updateStatus = false
    this.frmStatus = false
  }

  getProfileImageUrl() {
    let url = this.user.profile_image_url
    const baseUrl = this.siteDataService.baseUrl()
    if (url) url = url.replace(/d=mm/, 'd=' + encodeURIComponent(`${baseUrl}/assets/images/profile/avatar.png`))
    return url
  }
}
