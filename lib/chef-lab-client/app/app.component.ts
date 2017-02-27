import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { UserProfileService } from './services/user-profile.service';

const CHEF_API_HOST = 'http://localhost:3000'

@Component({
  selector: 'app-root',
  template: (window as any).mainTemplate || '<div>No template found for app-root!</div>'
})
export class AppComponent implements OnInit {
  constructor(private _tokenService: Angular2TokenService, private userProfileService:UserProfileService) {
    this._tokenService.init({
      apiBase: CHEF_API_HOST,
      oAuthBase: CHEF_API_HOST,
      oAuthPaths: {
        github: '/auth/github',
        google: '/auth/google_oauth2',
        twitter: '/auth/twitter'
      }
    });
  }

  ngOnInit() {
    this.userProfileService.load(1)
  }

  public isAuthenticated = function(){
    return this._tokenService.userSignedIn()
  }

  public logout  = function(){
    return this._tokenService.signOut()
  }

  public getUserInfo  = function() {
    if (this._tokenService.currentUserData) {
      return this._tokenService.currentUserData
    }
  }
}
