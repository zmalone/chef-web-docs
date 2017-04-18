import { Component, OnInit, ElementRef } from '@angular/core'
import { Angular2TokenService } from 'angular2-token'
import { UserProfileService } from './services/user-profile.service'
import { ProgressService } from './services/progress.service'
import { User } from './model/user'

let pageTemplate = (window as any).mainTemplate || '<div>No template found for app-root!</div>'
pageTemplate = pageTemplate.replace(/\{/g, '[OPENINGCURLY]')
pageTemplate = pageTemplate.replace(/\}/g, "{{ '}' }}") // tslint:disable-line:quotemark
pageTemplate = pageTemplate.replace(/\[OPENINGCURLY\]/g, "{{ '{' }}") // tslint:disable-line:quotemark

@Component({
  selector: 'app-root',
  template: pageTemplate,
})
export class AppComponent implements OnInit {
  private isSignedIn = false
  public userInfo: User

  constructor(
    private _tokenService: Angular2TokenService,
    private userProfileService: UserProfileService,
    private progressService: ProgressService,
    private el: ElementRef,
  ) {

    this._tokenService.init({
      apiBase: process.env.API_ENDPOINT,
      oAuthBase: process.env.API_ENDPOINT,
      oAuthPaths: {
        github: '/auth/github',
        google: '/auth/google_oauth2',
        twitter: '/auth/twitter',
        linkedin: '/auth/linkedin',
        chef: '/auth/chef_oauth2',
      },
    })
    this.progressService.init()

  }

  ngOnInit() {
    this.userProfileService.isAuthenticated().subscribe(next => {
      this.isSignedIn = next
    })
    this.userProfileService.userProfile.subscribe(user => {
      this.userInfo = user
    })
  }

  public logout = function(event) {
    event.preventDefault()
    return this.userProfileService.signOut()
  }

}
