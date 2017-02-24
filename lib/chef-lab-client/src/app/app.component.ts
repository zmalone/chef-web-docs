import {Component} from '@angular/core';
import {Angular2TokenService} from 'angular2-token';

const CHEF_API_HOST = 'http://localhost:3000/'

@Component({
  selector: 'app-root',
  template: (window as any).mainTemplate || '<div>No template found for app-root!</div>'
})
export class AppComponent {
  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: CHEF_API_HOST,
      oAuthBase: CHEF_API_HOST,
      oAuthPaths: {
        github: 'auth/github',
        google: 'auth/google_oauth2'
      }
    });
  }

  public isAuthenticated = function(){
    return this._tokenService.userSignedIn()
  }

  public logout  = function(){
    return this._tokenService.signOut()
  }


}
